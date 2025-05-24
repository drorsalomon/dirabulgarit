const Blog = require('../models/blogModel');
const enBlog = require('../models/enBlogModel');
const ruBlog = require('../models/ruBlogModel');
const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const ruAsset = require('../models/ruAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');
const moment = require('moment');

let blogsArray = [];
let totalBlogs = '';
let totalPages = '';
let pageNumber = '';

function getModelsByLang(lang) {
  if (lang === 'en') return { BlogModel: enBlog, AssetModel: enAsset };
  if (lang === 'ru') return { BlogModel: ruBlog, AssetModel: ruAsset };
  return { BlogModel: Blog, AssetModel: Asset };
}

exports.getBlogs = catchAsync(async (req, res, next) => {
  const { BlogModel } = getModelsByLang(res.locals.lang);
  const sortOptions = { date: -1 };

  const totalBlogsArray = await BlogModel.find({});

  const blogs = await BlogModel.find({})
    .sort(sortOptions)
    .skip((req.params.pageNumber - 1) * req.params.resPerPage)
    .limit(parseInt(req.params.resPerPage));

  if (!blogs) return next(new AppError('Could not find the requested blogs!', 404));

  totalBlogs = blogs.length;
  blogsArray = blogs;
  totalPages = Utils.populatePagesArray(totalBlogsArray, req.params.resPerPage);
  pageNumber = req.params.pageNumber;

  for (const blog of blogs) {
    blog.sectionOneTexts[0] = Utils.limitString(blog.sectionOneTexts[0], 350);
  }

  res.status(200).json({
    status: 'success',
    data: {
      totalBlogs,
      totalPages,
      pageNumber,
    },
  });
});

exports.renderBlogs = catchAsync(async (req, res, next) => {
  res.render(`${res.locals.lang}/blog`, {
    title: 'Blog Page',
    blogsArray,
    totalBlogs,
    totalPages,
    pageNumber,
    moment,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const { BlogModel, AssetModel } = getModelsByLang(res.locals.lang);
  const blog = await BlogModel.findOne({ slug: req.params.slug });

  if (!blog) {
    return next(new AppError('Could not find the requested blog!', 404));
  }

  const sortOptions = { project: 1, price: 1 };
  const hotAssets = await AssetModel.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  let blogAssets;
  if (blog.blogAssets) {
    blogAssets = await AssetModel.find({
      city: blog.blogAssets,
      sold: false,
      origin: { $in: 'vita' },
    }).sort(sortOptions);

    if (!blogAssets) return next(new AppError('Could not find the requested blog assets!', 404));
  }

  res.status(200).render(`${res.locals.lang}/blogContent`, {
    blog,
    moment,
    hotAssets,
    blogAssets,
  });
});
