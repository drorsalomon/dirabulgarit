const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.euroToNisExchange = catchAsync(async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: process.env.CURRENCY_API_URL,
      params: {
        format: 'json',
        from: process.env.CURRENCY_EURO_CODE,
        to: process.env.CURRENCY_NIS_CODE,
        amount: '1',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.CURRENCY_API_HOST,
      },
    });

    euroToNis = res.data.rates.ILS.rate;

    return euroToNis;
  } catch (err) {
    console.log(err);
    throw err;
  }
});
