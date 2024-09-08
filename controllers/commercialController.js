const catchAsync = require('../utils/catchAsync');

exports.getCamelot = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/commercial/camelot`, {
    title: 'Camelot Entertainment Center',
  });
});
