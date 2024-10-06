const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');
const puppeteer = require('puppeteer-core');
const pug = require('pug');
const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

let assetsArray = [];

exports.getSearchResults = catchAsync(async (req, res, next) => {
  try {
    mongooseQuery = Utils.buildMongooseQuery(req.body.filter);
    let sortOptions;
    if (req.params.sort === 'price') {
      sortOptions = { price: parseInt(req.params.type) === 1 ? 1 : -1 };
    } else {
      sortOptions = { date: parseInt(req.params.type) === 1 ? 1 : -1 };
    }
    const totalAssetsArray = res.locals.lang === 'he' ? await Asset.find(mongooseQuery) : await enAsset.find(mongooseQuery);
    const totalAssets = totalAssetsArray.length;

    const assets =
      res.locals.lang === 'he'
        ? await Asset.find(mongooseQuery)
            .sort(sortOptions)
            .skip((req.params.pageNumber - 1) * req.params.resPerPage)
            .limit(parseInt(req.params.resPerPage))
        : await enAsset
            .find(mongooseQuery)
            .sort(sortOptions)
            .skip((req.params.pageNumber - 1) * req.params.resPerPage)
            .limit(parseInt(req.params.resPerPage));

    assetsArray = assets;

    // Get total number of pages for pagination
    const totalPages = Utils.populatePagesArray(totalAssetsArray, req.params.resPerPage);

    if (!assets) return next(new AppError('Could not find the requested assets!', 404));
    res.status(200).json({
      status: 'success',
      data: {
        totalAssets,
        totalPages,
        pageNumber: req.params.pageNumber,
      },
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    //res.status(500).send('Internal Server Error');
  }
});

exports.renderSearchResults = catchAsync(async (req, res, next) => {
  const assets = assetsArray;
  const totalAssets = req.query.totalAssets;
  const totalPages = JSON.parse(req.query.totalPages);
  const pageNumber = req.query.pageNumber;

  res.render(`${res.locals.lang}/searchResults`, {
    title: 'Search Results',
    assets,
    totalAssets,
    totalPages,
    pageNumber,
  });
});

exports.getAsset = catchAsync(async (req, res, next) => {
  const asset = res.locals.lang === 'he' ? await Asset.findOne({ slug: req.params.slug }) : await enAsset.findOne({ slug: req.params.slug });
  if (!asset) return next(new AppError('Could not find the requested asset!', 404));

  let sortOptions = { project: 1, price: 1 };
  const priceRange = { $gte: asset.price - 40000, $lte: asset.price + 40000 };
  const filterCriteria = { price: priceRange, city: asset.city, sold: false, _id: { $ne: asset._id } };

  const relatedAssets =
    res.locals.lang === 'he' ? await Asset.find(filterCriteria).sort(sortOptions).limit(12) : await enAsset.find(filterCriteria).sort(sortOptions).limit(12);
  if (!relatedAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render(`${res.locals.lang}/asset`, {
    title: 'Asset Page',
    asset,
    relatedAssets,
  });
});

exports.getFavoriteAssets = catchAsync(async (req, res, next) => {
  let sortOptions = { project: 1, price: 1 };
  const assets =
    res.locals.lang === 'he'
      ? await Asset.find({ id: { $in: req.body.favoriteAssets } }).sort(sortOptions)
      : await enAsset.find({ id: { $in: req.body.favoriteAssets } }).sort(sortOptions);
  assetsArray = assets;
  if (!assets) return next(new AppError('Could not find the requested asset!', 404));
  res.status(200).json({ status: 'success' });
});

exports.renderFavoriteAssets = catchAsync(async (req, res, next) => {
  res.render(`${res.locals.lang}/favoriteAssets`, {
    title: 'Favorite assets Page',
    assetsArray,
  });
});

const convertWebPToJPG = async (webpUrl, outputFilePath) => {
  try {
    // Step 1: Fetch the image from the provided URL
    const response = await fetch(webpUrl);
    if (!response.ok) throw new Error(`Failed to fetch image from ${webpUrl}`);

    // Step 2: Read the image data into a buffer
    const imageBuffer = await response.buffer();

    // Step 3: Convert the image buffer to JPEG and save it locally
    await sharp(imageBuffer)
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(outputFilePath);

    return outputFilePath;
  } catch (error) {
    console.error(`Error converting WebP image ${webpUrl}: ${error.message}`);
    return null; // If conversion fails, return null
  }
};

exports.generateAssetPDF = catchAsync(async (req, res) => {
  try {
    // Extract data from the request body
    const asset = req.body;

    // Directory to save the converted images
    const imageDirectory = path.join(__dirname, '../public/pdf/images');

    // Handle the main image (if available)
    if (asset.mainImage && asset.mainImage.endsWith('.webp')) {
      const mainImagePath = path.join(imageDirectory, `mainImage.jpg`);

      // Convert mainImage from .webp to .jpg and update the path
      const convertedMainImagePath = await convertWebPToJPG(asset.mainImage, mainImagePath);
      if (convertedMainImagePath) {
        asset.mainImage = mainImagePath;
        const mainImageBuffer = fs.readFileSync(asset.mainImage);
        const mainBase64Image = mainImageBuffer.toString('base64');
        asset.mainImage = `data:image/jpeg;base64,${mainBase64Image}`;
      }
    }

    // Loop over images and convert .webp to .jpg if necessary
    for (let i = 0; i < asset.images.length; i++) {
      const imageUrl = asset.images[i];

      // Only process if it's a .webp file
      if (imageUrl.endsWith('.webp')) {
        // Construct the path for the new .jpg file
        const localImagePath = path.join(imageDirectory, `image_${i + 1}.jpg`);

        // Convert the image to .jpg and get the new local path
        const convertedPath = await convertWebPToJPG(imageUrl, localImagePath);

        // If conversion is successful, update the image URL in the asset array
        if (convertedPath) {
          asset.images[i] = localImagePath;
          const imageBuffer = fs.readFileSync(localImagePath);
          const base64Image = imageBuffer.toString('base64');
          asset.images[i] = `data:image/jpeg;base64,${base64Image}`;
        }
      }
    }

    // Generate the Mapbox URL for the map image based on asset location
    let mapUrl = '';
    if (asset.location)
      mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-building+2078a9(${asset.location.long},${asset.location.lat})/${asset.location.long},${asset.location.lat},12/600x300?access_token=pk.eyJ1IjoiZHJvcnNhbDMiLCJhIjoiY2x2bDFjdTY0MGdibzJrbXc3ajJubmxiZyJ9.7pdKIb23xT3EUfmDm16jnA`;

    // Generate HTML content using a Pug template
    const html = pug.renderFile(path.join(__dirname, '../views/he/pdf/assetPDF.pug'), { asset, mapUrl, title: 'Asset PDF' });

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      executablePath: '/app/.chrome-for-testing/chrome-linux64/chrome', // Specify the path to the Chromium executable
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set the HTML content in the Puppeteer page
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate a PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px',
      },
    });

    await browser.close();

    // Sanitize the asset name for the file name
    const sanitizedAssetName = asset.name.replace(/[^a-zA-Z0-9-_\.]/g, '_'); // Replace invalid characters
    const fileName = `${sanitizedAssetName}.pdf`;
    const filePath = path.join(__dirname, '../public/pdf', fileName);

    // Log the file path for debugging
    console.log('Saving PDF to:', filePath);

    // Ensure the directory exists
    const pdfDirectory = path.dirname(filePath); // Get the directory path
    if (!fs.existsSync(pdfDirectory)) {
      console.log('PDF directory does not exist. Creating:', pdfDirectory);
      fs.mkdirSync(pdfDirectory, { recursive: true }); // Create the directory recursively
    }

    // Delete all files in the images directory
    const files = fs.readdirSync(imageDirectory); // Read all files in the directory
    for (const file of files) {
      const filePath = path.join(imageDirectory, file);
      fs.unlinkSync(filePath); // Delete each file
    }

    // Return the URL to access the generated PDF
    const pdfUrl = `https://www.dirabulgarit.com/asset/pdf/${fileName}`;
    res.status(200).json({ status: 'success', pdfUrl, filename: fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
});
