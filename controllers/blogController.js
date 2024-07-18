const Blog = require('../models/blogModel');
const enBlog = require('../models/enBlogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const moment = require('moment');

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = res.locals.lang === 'he' ? await Blog.findOne({ slug: req.params.slug }) : await enBlog.findOne({ slug: req.params.slug });
  if (!blog) {
    return next(new AppError('Could not find the requested blog!', 404));
  }
  res.status(200).render(`${res.locals.lang}/blogContent`, {
    blog,
    moment,
  });
});
