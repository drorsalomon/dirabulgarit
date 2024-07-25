const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
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
  const hotAssets =
    res.locals.lang === 'he' ? await Asset.find({ hotAsset: true }).sort(sortOptions) : await enAsset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render(`${res.locals.lang}/asset`, {
    title: 'Asset Page',
    asset,
    hotAssets,
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
