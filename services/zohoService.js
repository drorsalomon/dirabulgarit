const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.getZohoToken = catchAsync(async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=1000.UUNJFBGY0OU78GXWVYZO9G8G8KSJRI&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
    });

    const zohoToken = res.data.access_token;
    return zohoToken;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

exports.updateHerokuConfigVar = catchAsync(async (accessToken) => {
  console.log('Updating Heroku config with accessToken:', accessToken);
  try {
    await axios({
      method: 'PATCH',
      url: `https://api.heroku.com/apps/${process.env.HEROKU_APP_NAME}/config-vars`,
      data: {
        ZOHO_ACCESS_TOKEN: accessToken,
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.heroku+json; version=3',
        Authorization: `Bearer ${process.env.HEROKU_API_TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});
