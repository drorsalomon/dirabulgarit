const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'An asset must have an id!'],
  },
  name: {
    type: String,
    required: [true, 'An asset must have a name!'],
    //unique: true,
    trim: true,
    maxlength: [150, 'An asset name must have less or equal then 150 characters'],
  },
  slug: String,
  price: {
    type: Number,
    //required: [true, 'An asset must have a price'],
    //min: [1, 'Asset price must be 1 or above'],
    //max: [1000000, "Asset price can't be more than 1,000,000!"],
  },
  priceNis: {
    type: Number,
    //required: [true, 'An asset must have a price'],
    //min: [1, 'Asset price in nis must be 1 or above'],
    //max: [4000000, "Asset price in nis can't be more than 4,000,000!"],
  },
  priceBeginningAt: Boolean,
  project: {
    type: String,
    //required: [true, 'An asset must have a project name!'],
  },
  city: {
    type: String,
    required: [true, 'An asset must have a city!'],
  },
  type: {
    type: String,
    required: [true, 'An asset must have a type!'],
  },
  sm: String,
  oceanView: String,
  rooms: String,
  bedrooms: {
    type: Number,
    min: [1, 'Asset must have at least 1 bedroom!'],
    max: [6, "Asset can't have more than 6 bedrooms!"],
  },
  bathrooms: {
    type: Number,
    min: [1, 'Asset must have at least 1 bathroom!'],
    max: [6, "Asset can't have more than 6 bathrooms!"],
  },
  terraces: Number,
  floor: String,
  parking: String,
  readiness: String,
  maintenanceFee: String,
  furnished: Boolean,
  windDirections: String,
  description: {
    text: [String],
    listOne: {
      listOneTitle: String,
      listOneText: [String],
    },
    listTwo: {
      listTwoTitle: String,
      listTwoText: [String],
    },
  },
  yearBuilt: {
    type: Number,
    //min: [1950, 'Asset must be build from 1950 onwards!'],
    //max: [new Date().getFullYear(), "Asset can't have been built in the future!"],
  },
  amenities: [String],
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number], // Long + Lat
    title: String,
  },
  mainImage: {
    type: String,
    required: [true, 'An asset must have at least one main image!'],
  },
  images: {
    type: [String],
    required: [true, 'An asset must have at least one image!'],
  },
  videoURL: String,
  origin: String,
  sold: Boolean,
  exclusive: Boolean,
  hotAsset: Boolean,
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
