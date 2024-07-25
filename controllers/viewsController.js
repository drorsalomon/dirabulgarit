const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  let sortOptions = { project: 1, price: 1 };
  const hotAssets =
    res.locals.lang === 'he' ? await Asset.find({ hotAsset: true }).sort(sortOptions) : await enAsset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render(`${res.locals.lang}/overview`, {
    title: 'Overview Page',
    hotAssets,
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  let sortOptions = { project: 1, price: 1 };
  const hotAssets =
    res.locals.lang === 'he' ? await Asset.find({ hotAsset: true }).sort(sortOptions) : await enAsset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render(`${res.locals.lang}/search`, {
    title: 'Search Page',
    hotAssets,
  });
});
exports.getQAndA = (req, res) => {
  res.status(200).render(`${res.locals.lang}/qAndA`);
};
exports.getInvest = (req, res) => {
  res.status(200).render(`${res.locals.lang}/invest`);
};
exports.getAbout = (req, res) => {
  res.status(200).render(`${res.locals.lang}/about`);
};

exports.getContactUs = (req, res) => {
  res.status(200).render(`${res.locals.lang}/contactUs`);
};
exports.getContactUsConfirm = (req, res) => {
  res.status(200).render(`${res.locals.lang}/contactUsConfirm`);
};
exports.getPricing = (req, res) => {
  res.status(200).render(`${res.locals.lang}/pricing`);
};
exports.getPrivacy = (req, res) => {
  res.status(200).render(`${res.locals.lang}/privacy`);
};
exports.getAccessibility = (req, res) => {
  res.status(200).render(`${res.locals.lang}/accessibility`);
};
exports.getTermsOfService = (req, res) => {
  res.status(200).render(`${res.locals.lang}/termsOfService`);
};
exports.getSiteMap = (req, res) => {
  res.status(200).render(`${res.locals.lang}/siteMap`);
};
