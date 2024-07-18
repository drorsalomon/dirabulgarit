const mongoose = require('mongoose');

const enBlogSchema = mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'A blog must have an id!'],
  },
  blogTitle: {
    type: String,
    required: [true, 'An blog must have a title!'],
    unique: true,
    maxlength: [500, 'A blog title must have less or equal then 500 characters!'],
  },
  slug: String,
  date: {
    type: Date,
    required: [true, 'A blog must have a date!'],
  },
  imgSrc: {
    type: String,
    required: [true, 'A blog must have an image src!'],
  },
  imgAlt: {
    type: String,
    required: [true, 'A blog must have an image alt!'],
  },
  sectionOneTitle: String,
  sectionOneTexts: [String],
  sectionTwoTitle: String,
  sectionTwoTexts: [String],
  sectionThreeTitle: String,
  sectionThreeTexts: [String],
  sectionFourTitle: String,
  sectionFourTexts: [String],
  sectionFiveTitle: String,
  sectionFiveTexts: [String],
  listOne: {
    listOneTitle: String,
    listOneTexts: [String],
  },
  listTwo: {
    listTwoTitle: String,
    listTwoTexts: [String],
  },
  listThree: {
    listThreeTitle: String,
    listThreeTexts: [String],
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const enBlog = mongoose.model('enBlog', enBlogSchema);

module.exports = enBlog;
