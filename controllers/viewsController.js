const Asset = require('../models/assetModel');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');
const moment = require('moment');

exports.getOverview = catchAsync(async (req, res, next) => {
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('overview', {
    title: 'Overview Page',
    hotAssets,
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('search', {
    title: 'Search Page',
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

exports.getContactUs = (req, res) => {
  res.status(200).render('contactUs');
};
exports.getContactUsConfirm = (req, res) => {
  res.status(200).render('contactUsConfirm');
};
exports.getPricing = (req, res) => {
  res.status(200).render('pricing');
};
exports.getPrivacy = (req, res) => {
  res.status(200).render('privacy');
};
exports.getAccessibility = (req, res) => {
  res.status(200).render('accessibility');
};
exports.getTermsOfService = (req, res) => {
  res.status(200).render('termsOfService');
};
exports.getSiteMap = (req, res) => {
  res.status(200).render('siteMap');
};
