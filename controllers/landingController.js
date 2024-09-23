const catchAsync = require('../utils/catchAsync');

exports.getAtlantisAria3 = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/landingPages/atlantisAria3Landing`, {
    title: 'Atlantis Aria 3',
  });
});

exports.getAtlantisEuphoria = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/landingPages/atlantisEuphoriaLanding`, {
    title: 'Atlantis Euphoria',
  });
});
