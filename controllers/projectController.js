const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAtlantisAria2 = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis Aria 2' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis Aria 2' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisAria2`, {
    title: 'Atlantis Aria 2',
    projectAssets,
  });
});

exports.getAtlantisAria3 = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis Aria 3' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis Aria 3' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisAria3`, {
    title: 'Atlantis Aria 3',
    projectAssets,
  });
});

exports.getAtlantisEuphoria = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis Euphoria' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis Euphoria' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisEuphoria`, {
    title: 'Atlantis Euphoria',
    projectAssets,
  });
});

exports.getAtlantisBarcode = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis Barcode' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis Barcode' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisBarcode`, {
    title: 'Atlantis Barcode',
    projectAssets,
  });
});

exports.getAtlantisL6 = catchAsync(async (req, res) => {
  let sortOptions = { price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis L6' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis L6' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisL6`, {
    title: 'Atlantis L6',
    projectAssets,
  });
});
