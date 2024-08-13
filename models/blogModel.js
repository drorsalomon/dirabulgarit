const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
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
  sectionOneTexts: {
    type: [String],
    required: [true, 'A blog must have at least one section text!'],
  },
  sectionTwoTitle: String,
  sectionTwoTexts: [String],
  sectionThreeTitle: String,
  sectionThreeTexts: [String],
  sectionFourTitle: String,
  sectionFourTexts: [String],
  sectionFiveTitle: String,
  sectionFiveTexts: [String],
  sectionSixTitle: String,
  sectionSixTexts: [String],
  sectionSevenTitle: String,
  sectionSevenTexts: [String],
  sectionEightTitle: String,
  sectionEightTexts: [String],
  sectionNineTitle: String,
  sectionNineTexts: [String],
  sectionTenTitle: String,
  sectionTenTexts: [String],
  sectionElevenTitle: String,
  sectionElevenTexts: [String],
  sectionTwelveTitle: String,
  sectionTwelveTexts: [String],
  sectionThirteenTitle: String,
  sectionThirteenTexts: [String],
  sectionFourteenTitle: String,
  sectionFourteenTexts: [String],
  sectionFifteenTitle: String,
  sectionFifteenTexts: [String],
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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
