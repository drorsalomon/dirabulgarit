let currency = {
  active: 'euro',
  notActive: 'nis',
};

const euroSymbol = '€';
const nisSymbol = '₪';

const setCurrency = (req, res) => {
  try {
    currency = {
      active: req.body.activeCurrency,
      notActive: req.body.notActiveCurrency,
    };
    res.locals.currency = currency;
    res.status(200).json({
      status: 'success',
      data: {
        currency,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getCurrency = (req, res, next) => {
  res.locals.currency = currency;
  next();
};

module.exports = { currency, euroSymbol, nisSymbol, setCurrency, getCurrency };
