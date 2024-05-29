const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const moment = require('moment');

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    return next(new AppError('Could not find the requested blog!', 404));
  }
  res.status(200).render('blogContent', {
    blog,
    moment,
  });
});
