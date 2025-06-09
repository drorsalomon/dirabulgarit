const Project = require('../models/projectModel');
const enProject = require('../models/enProjectModel');
const ruProject = require('../models/ruProjectModel');
const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const ruAsset = require('../models/ruAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getProjectBySlug = catchAsync(async (req, res) => {
  try {
    let project;
    if (res.locals.lang === 'he') {
      project = await Project.findOne({ slug: req.params.slug });
    } else if (res.locals.lang === 'en') {
      project = await enProject.findOne({ slug: req.params.slug });
    } else if (res.locals.lang === 'ru') {
      project = await ruProject.findOne({ slug: req.params.slug });
    } else {
      project = [];
    }
    if (!project) {
      console.log('No project found for slug:', req.params.slug);
      return res.status(404).render('error', {
        title: 'Project Not Found',
        message: 'The requested project could not be found.',
      });
    }

    let sortOptions = { sold: 1, price: 1 };
    let projectAssets;

    if (res.locals.lang === 'he') {
      projectAssets = await Asset.find({ project: project.name }).sort(sortOptions);
    } else if (res.locals.lang === 'en') {
      projectAssets = await enAsset.find({ project: project.name }).sort(sortOptions);
    } else if (res.locals.lang === 'ru') {
      projectAssets = await ruAsset.find({ project: project.name }).sort(sortOptions);
    } else {
      projectAssets = [];
    }
    if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

    const projectData = {
      project,
      projectGalleryImages: project.projectGalleryImages,
      projectModalImages: project.projectModalImages,
      projectNumbersBuildings: project.projectNumbersBuildings,
      projectNumbersCommercial: project.projectNumbersCommercial,
      projectNumbersFloors: project.projectNumbersFloors,
      projectNumbersApartments: project.projectNumbersApartments,
      projectNumbersParking: project.projectNumbersParking,
      projectNumbersArea: project.projectNumbersArea,
      projectNumbersGreenArea: project.projectNumbersGreenArea,
      projectNumbersBuildStart: project.projectNumbersBuildStart,
      projectNumbersBuildEnd: project.projectNumbersBuildEnd,
      projectTextImg: project.projectTextImg,
      projectTexts: project.projectTexts,
      projectAmenities: project.projectAmenities.map((amenity) => ({
        src: amenity.src,
        alt: amenity.alt,
        amenity: amenity.amenity,
      })),
      projectAssets: [],
      videoSrc: project.videoURL,
      mainImage: project.projectGalleryImages[0]?.src || '',
      projectAssets,
    };

    const templatePath = res.locals.lang ? `${res.locals.lang}/project` : 'project';
    res.status(200).render(templatePath, projectData);
  } catch (error) {
    console.error(`Error fetching project with slug ${req.params.slug}:`, error);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'An error occurred while fetching the project. Please try again later.',
    });
  }
});
