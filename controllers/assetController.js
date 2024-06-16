const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');

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

    const totalAssetsArray = await Asset.find(mongooseQuery);
    const totalAssets = totalAssetsArray.length;

    const assets = await Asset.find(mongooseQuery)
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

  res.render('searchResults', {
    title: 'Search Results',
    assets,
    totalAssets,
    totalPages,
    pageNumber,
  });
});

exports.getAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findOne({ slug: req.params.slug });
  if (!asset) return next(new AppError('Could not find the requested asset!', 404));

  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('asset', {
    title: 'Asset Page',
    asset,
    hotAssets,
  });
});

exports.getFavoriteAssets = catchAsync(async (req, res, next) => {
  let sortOptions = { price: 1 };
  const assets = await Asset.find({ id: { $in: req.body.favoriteAssets } }).sort(sortOptions);
  assetsArray = assets;
  if (!assets) return next(new AppError('Could not find the requested asset!', 404));
  res.status(200).json({ status: 'success' });
});

exports.renderFavoriteAssets = catchAsync(async (req, res, next) => {
  res.render('favoriteAssets', {
    title: 'Favorite assets Page',
    assetsArray,
  });
});
