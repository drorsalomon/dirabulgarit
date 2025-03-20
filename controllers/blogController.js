const Blog = require('../models/blogModel');
const enBlog = require('../models/enBlogModel');
const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');
const moment = require('moment');

let blogsArray = [];
let totalBlogs = '';
let totalPages = '';
let pageNumber = '';

exports.getBlogs = catchAsync(async (req, res, next) => {
  let sortOptions = { date: -1 };

  const totalBlogsArray = res.locals.lang === 'he' ? await Blog.find({}) : await enBlog.find({});

  const blogs =
    res.locals.lang === 'he'
      ? await Blog.find({})
          .sort(sortOptions)
          .skip((req.params.pageNumber - 1) * req.params.resPerPage)
          .limit(parseInt(req.params.resPerPage))
      : await enBlog
          .find({})
          .sort(sortOptions)
          .skip((req.params.pageNumber - 1) * req.params.resPerPage)
          .limit(parseInt(req.params.resPerPage));

  totalBlogs = blogs.length;

  blogsArray = blogs;

  totalPages = Utils.populatePagesArray(totalBlogsArray, req.params.resPerPage);

  pageNumber = req.params.pageNumber;

  if (!blogs) return next(new AppError('Could not find the requested hot assets!', 404));

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
  let blogAssets;
  const blog = res.locals.lang === 'he' ? await Blog.findOne({ slug: req.params.slug }) : await enBlog.findOne({ slug: req.params.slug });
  if (!blog) {
    return next(new AppError('Could not find the requested blog!', 404));
  }

  let sortOptions = { project: 1, price: 1 };
  const hotAssets =
    res.locals.lang === 'he' ? await Asset.find({ hotAsset: true }).sort(sortOptions) : await enAsset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  if (blog.blogAssets) {
    blogAssets =
      res.locals.lang === 'he'
        ? await Asset.find({ city: blog.blogAssets, sold: false, origin: { $ne: 'yeheli' } }).sort(sortOptions)
        : await enAsset.find({ city: blog.blogAssets, sold: false, origin: { $ne: 'yeheli' } }).sort(sortOptions);
    if (!blogAssets) return next(new AppError('Could not find the requested blog assets!', 404));
  }

  res.status(200).render(`${res.locals.lang}/blogContent`, {
    blog,
    moment,
    hotAssets,
    blogAssets,
  });
});
