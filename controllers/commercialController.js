const catchAsync = require('../utils/catchAsync');

exports.getCamelot = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/commercial/camelot`, {
    title: 'Camelot Entertainment Center',
  });
});

exports.getVarsanoChic = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/commercial/varsanoChic`, {
    title: 'Varsano Chic Apartments',
  });
});

exports.getSamokov = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/commercial/samokov`, {
    title: 'Samokov',
  });
});
exports.getPomorie = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/commercial/pomorieCommercial`, {
    title: 'Pomorie Commercial Building',
  });
});
