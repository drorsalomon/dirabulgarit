const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const ruAsset = require('../models/ruAssetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAtlantisAria2 = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
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
  let sortOptions = { sold: 1, price: 1 };
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
  let sortOptions = { sold: 1, price: 1 };
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
  let sortOptions = { sold: 1, price: 1 };
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

exports.getAtlantisBarcode2 = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlantis Barcode 2' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlantis Barcode 2' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlantisBarcode2`, {
    title: 'Atlantis Barcode 2',
    projectAssets,
  });
});

exports.getAtlasAzimuth = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Atlas Azimuth' }).sort(sortOptions)
      : await enAsset.find({ project: 'Atlas Azimuth' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/atlasAzimuth`, {
    title: 'Atlas Azimuth',
    projectAssets,
  });
});

exports.getVillaMargarita = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Villa Margarita' }).sort(sortOptions)
      : await enAsset.find({ project: 'Villa Margarita' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/villaMargarita`, {
    title: 'Villa Margarita',
    projectAssets,
  });
});

exports.getMelliaFlorance = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Mellia Florance' }).sort(sortOptions)
      : await enAsset.find({ project: 'Mellia Florance' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/melliaFlorance`, {
    title: 'Mellia Florance',
    projectAssets,
  });
});

exports.getMountainResidence = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Mountain View Residence' }).sort(sortOptions)
      : await enAsset.find({ project: 'Mountain View Residence' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/mountainResidence`, {
    title: 'Mountain View Residence',
    projectAssets,
  });
});

exports.getMountainView = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Vitosha Mountain View' }).sort(sortOptions)
      : await enAsset.find({ project: 'Vitosha Mountain View' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/mountainView`, {
    title: 'Vitosha Mountain View',
    projectAssets,
  });
});

exports.getMountainBoutique = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  const projectAssets =
    res.locals.lang === 'he'
      ? await Asset.find({ project: 'Mountain View Boutique' }).sort(sortOptions)
      : await enAsset.find({ project: 'Mountain View Boutique' }).sort(sortOptions);
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/mountainBoutique`, {
    title: 'Mountain View Boutique',
    projectAssets,
  });
});

exports.getFortNoksSuites = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  let projectAssets;

  if (res.locals.lang === 'he') {
    projectAssets = await Asset.find({ project: 'Fort Noks Premier Suites' }).sort(sortOptions);
  } else if (res.locals.lang === 'en') {
    projectAssets = await enAsset.find({ project: 'Fort Noks Premier Suites' }).sort(sortOptions);
  } else if (res.locals.lang === 'ru') {
    projectAssets = await ruAsset.find({ project: 'Fort Noks Premier Suites' }).sort(sortOptions);
  } else {
    // Fallback if none match (optional)
    projectAssets = [];
  }
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/fortNoksSuites`, {
    title: 'Fort Noks Premier Suites',
    projectAssets,
  });
});

exports.getGreenFortSuites = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  let projectAssets;

  if (res.locals.lang === 'he') {
    projectAssets = await Asset.find({ project: 'Green Fort Suites' }).sort(sortOptions);
  } else if (res.locals.lang === 'en') {
    projectAssets = await enAsset.find({ project: 'Green Fort Suites' }).sort(sortOptions);
  } else if (res.locals.lang === 'ru') {
    projectAssets = await ruAsset.find({ project: 'Green Fort Suites' }).sort(sortOptions);
  } else {
    // Fallback if none match (optional)
    projectAssets = [];
  }
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/greenFortSuites`, {
    title: 'Green Fort Suites',
    projectAssets,
  });
});

exports.getPremierFortBeach = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  let projectAssets;

  if (res.locals.lang === 'he') {
    projectAssets = await Asset.find({ project: 'Premier Fort Beach' }).sort(sortOptions);
  } else if (res.locals.lang === 'en') {
    projectAssets = await enAsset.find({ project: 'Premier Fort Beach' }).sort(sortOptions);
  } else if (res.locals.lang === 'ru') {
    projectAssets = await ruAsset.find({ project: 'Premier Fort Beach' }).sort(sortOptions);
  } else {
    // Fallback if none match (optional)
    projectAssets = [];
  }
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/premierFortBeach`, {
    title: 'Premier Fort Beach',
    projectAssets,
  });
});

exports.getPrestigeFortBeach = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  let projectAssets;

  if (res.locals.lang === 'he') {
    projectAssets = await Asset.find({ project: 'Prestige Fort Beach' }).sort(sortOptions);
  } else if (res.locals.lang === 'en') {
    projectAssets = await enAsset.find({ project: 'Prestige Fort Beach' }).sort(sortOptions);
  } else if (res.locals.lang === 'ru') {
    projectAssets = await ruAsset.find({ project: 'Prestige Fort Beach' }).sort(sortOptions);
  } else {
    // Fallback if none match (optional)
    projectAssets = [];
  }
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/prestigeFortBeach`, {
    title: 'Prestige Fort Beach',
    projectAssets,
  });
});

exports.getNessebarFortResidence = catchAsync(async (req, res) => {
  let sortOptions = { sold: 1, price: 1 };
  let projectAssets;

  if (res.locals.lang === 'he') {
    projectAssets = await Asset.find({ project: 'Nessebar Fort Residence' }).sort(sortOptions);
  } else if (res.locals.lang === 'en') {
    projectAssets = await enAsset.find({ project: 'Nessebar Fort Residence' }).sort(sortOptions);
  } else if (res.locals.lang === 'ru') {
    projectAssets = await ruAsset.find({ project: 'Nessebar Fort Residence' }).sort(sortOptions);
  } else {
    // Fallback if none match (optional)
    projectAssets = [];
  }
  if (!projectAssets) return next(new AppError('Could not find the requested asset!', 404));

  res.status(200).render(`${res.locals.lang}/projects/nessebarFortResidence`, {
    title: 'Nessebar Fort Residence',
    projectAssets,
  });
});
