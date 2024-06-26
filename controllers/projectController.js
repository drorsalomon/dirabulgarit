const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAtlantisAria2 = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets = await Asset.find({ project: 'Atlantis Aria 2' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render('projects/atlantisAria2', {
    title: 'Atlantis Aria 2',
    projectAssets,
  });
});

exports.getAtlantisAria3 = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets = await Asset.find({ project: 'Atlantis Aria 3' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render('projects/atlantisAria3', {
    title: 'Atlantis Aria 3',
    projectAssets,
  });
});

exports.getAtlantisEuphoria = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets = await Asset.find({ project: 'Atlantis Euphoria' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render('projects/atlantisEuphoria', {
    title: 'Atlantis Euphoria',
    projectAssets,
  });
});
