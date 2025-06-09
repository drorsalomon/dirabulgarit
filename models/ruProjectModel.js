const mongoose = require('mongoose');

const ruProjectSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'A project must have an id!'],
  },
  name: {
    type: String,
    required: [true, 'A project must have a name!'],
    //unique: true,
    trim: true,
    maxlength: [150, 'An project name must have less or equal then 150 characters'],
  },
  slug: String,
  metaDescription: {
    type: String,
    required: [true, 'A project must have a metaDescription'],
  },
  mainImageHiddenClass: String,
  mainImageHiddenDescription: String,
  projectGalleryImages: {
    type: [
      {
        src: {
          type: String,
          required: [true, 'Image src is required.'],
        },
        alt: {
          type: String,
          required: [true, 'Image alt text is required.'],
        },
      },
    ],
    required: [true, 'A project must have at least one gallery image!'],
  },
  projectModalImages: {
    type: [
      {
        src: {
          type: String,
          required: [true, 'Image src is required.'],
        },
        alt: {
          type: String,
          required: [true, 'Image alt text is required.'],
        },
        active: Boolean,
      },
    ],
    required: [true, 'A project must have at least one modal image!'],
  },
  projectNumbersBuildings: Boolean,
  projectNumbersCommercial: Boolean,
  projectNumbersFloors: Boolean,
  projectNumbersApartments: Boolean,
  projectNumbersParking: Boolean,
  projectNumbersArea: Boolean,
  projectNumbersGreenArea: Boolean,
  projectNumbersBuildStart: String,
  projectNumbersBuildEnd: String,
  projectTextImg: {
    type: [
      {
        src: String,
        alt: String,
        text: String,
      },
    ],
  },
  projectTexts: {
    type: [
      {
        textType: String,
        content: String,
        order: Number,
      },
    ],
  },
  projectAmenities: {
    type: [
      {
        src: String,
        alt: String,
        amenity: String,
      },
    ],
  },
  midImageHiddenDescription: String,
  midImageHiddenClass: String,
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number], // Long + Lat
    title: String,
  },
  videoHiddenClass: String,
  videoHiddenDescription: String,
  videoURL: String,
  installments: {
    type: {
      titles: {
        type: [String],
        required: [true, 'Installment titles are required.'],
      },
      plans: [
        {
          title: {
            type: String,
            required: [true, 'Each installment plan must have a title.'],
          },
          details: {
            type: [String],
            required: [true, 'Each installment plan must have details.'],
          },
        },
      ],
    },
  },
  origin: String,
  exclusive: Boolean,
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const ruProject = mongoose.model('ruProject', ruProjectSchema);

module.exports = ruProject;
