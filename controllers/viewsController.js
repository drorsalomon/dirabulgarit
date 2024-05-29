const Asset = require('../models/assetModel');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');
const axios = require('axios');
const schedule = require('node-schedule');
const Utils = require('../utils/utils');
const moment = require('moment');
//const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
//const multer = require('multer');
//const multerS3 = require('multer-s3');

dotenv.config({ path: './config.env' });

let currency = {
  active: 'euro',
  notActive: 'nis',
};

let euroToNis = 0;
const euroSymbol = '€';
const nisSymbol = '₪';

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const region = process.env.AWS_BUCKET_REGION;
// const myBucket = process.env.AWS_BUCKET_NAME;

// Set s3 configurations
// const s3 = new S3Client({
//   region: region,
//   credentials: {
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
//   },
// });

// // Multer image upload
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: myBucket,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       const folderName = 'dira-bulgarit-images/';
//       const fileName = Date.now().toString() + '-' + file.originalname; // Unique file name
//       cb(null, folderName + fileName);
//     },
//   }),
// });

// const uploadImages = upload.array('images', 14);

// exports.uploadImages = (req, res, next) => {
//   uploadImages(req, res, function (err) {
//     if (err) {
//       return res.status(500).json({ message: 'Upload error', error: err });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     res.status(200).json({
//       message: 'Upload successful',
//       files: req.files.map((file) => ({
//         url: file.location,
//       })),
//     });
//   });
// };

const euroToNisExchange = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: process.env.CURRENCY_API_URL,
      params: {
        format: 'json',
        from: process.env.CURRENCY_EURO_CODE,
        to: process.env.CURRENCY_NIS_CODE,
        amount: '1',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.CURRENCY_API_HOST,
      },
    });

    euroToNis = res.data.rates.ILS.rate;

    return euroToNis;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const dailyAssetPriceNisUpdate = schedule.scheduleJob('0 0 * * *', async function () {
  try {
    let counter = 0;
    let currentTimeDate = new Date();
    console.log(`***** Daily price update STARTED at: ${currentTimeDate.toLocaleString()} *****`);
    const euroToNisRate = await euroToNisExchange();
    console.log('1 Euro = ' + euroToNisRate + ' Nis');
    const assets = await Asset.find({});
    for (let asset of assets) {
      if (asset.price !== undefined) {
        const newPriceNis = asset.price * euroToNisRate;
        await Asset.updateOne({ _id: asset._id }, { $set: { priceNis: Math.floor(newPriceNis) } });
        console.log(`Updated Asset priceNis to: ${Math.floor(newPriceNis)}, Asset ${++counter} out of ${assets.length}`);
      }
    }
    console.log(`***** Daily price update ENDED at: ${currentTimeDate.toLocaleString()} *****`);
  } catch (err) {
    console.error(err);
  }
});

exports.setCurrency = catchAsync(async (req, res, next) => {
  try {
    currency = {
      active: req.body.activeCurrency,
      notActive: req.body.notActiveCurrency,
    };

    res.locals.currency = currency;
    res.status(200).json({
      status: 'success',
      data: {
        currency,
        euroToNis,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

exports.getCurrency = catchAsync(async (req, res, next) => {
  res.locals.currency = currency;

  next();
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const currencySymbol = currency.active === 'euro' ? '€' : '₪';
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('overview', {
    title: 'Overview Page',
    currencySymbol,
    euroSymbol,
    nisSymbol,
    hotAssets,
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  const currencySymbol = currency.active === 'euro' ? '€' : '₪';
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('search', {
    title: 'Search Page',
    currencySymbol,
    euroSymbol,
    nisSymbol,
    hotAssets,
  });
});
exports.getQAndA = (req, res) => {
  res.status(200).render('qAndA');
};
exports.getInvest = (req, res) => {
  res.status(200).render('invest');
};
exports.getAbout = (req, res) => {
  res.status(200).render('about');
};

exports.getBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({});

  if (!blogs) return next(new AppError('Could not find the requested hot assets!', 404));

  for (const blog of blogs) {
    blog.sectionOneTexts[0] = Utils.limitString(blog.sectionOneTexts[0], 350);
  }

  res.status(200).render('blog', {
    title: 'Blog Page',
    blogs,
    moment,
  });
});

exports.getCalendly = (req, res) => {
  res.status(200).render('calendly');
};
exports.getPricing = (req, res) => {
  res.status(200).render('pricing');
};
exports.getPrivacy = (req, res) => {
  res.status(200).render('privacy');
};
exports.getTermsOfService = (req, res) => {
  res.status(200).render('termsOfService');
};
exports.getSiteMap = (req, res) => {
  res.status(200).render('siteMap');
};
