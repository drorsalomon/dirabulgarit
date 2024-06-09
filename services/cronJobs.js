const currencyExchange = require('./currencyExchange');
const zohoService = require('./zohoService');
const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const cron = require('node-cron');

const dailyAssetPriceNisUpdate = cron.schedule(
  '0 0 * * *',

  async function () {
    try {
      let counter = 0;
      let currentTimeDate = new Date();
      console.log(`***** Daily price update STARTED at: ${currentTimeDate.toLocaleString()} *****`);
      const euroToNisRate = await currencyExchange.euroToNisExchange();
      console.log('1 Euro = ' + euroToNisRate + ' Nis');
      const assets = await Asset.find({});
      for (let asset of assets) {
        if (asset.price !== undefined) {
          const newPriceNis = asset.price * euroToNisRate;
          await Asset.updateOne({ _id: asset._id }, { $set: { priceNis: Math.floor(newPriceNis) } });
          console.log(`Updated Asset priceNis to: ${Math.floor(newPriceNis)}, Asset ${++counter} out of ${assets.length}`);
        }
      }
      console.log(`***** Daily price update ENDED at: ${currentTimeDate.toLocaleString()} *****`);
    } catch (err) {
      console.error(err);
    }
  },
  {
    scheduled: true,
    timezone: 'Israel',
  },
);

let lastRunTime = null;

const getZohoRefreshToken = cron.schedule(
  '* * * * *',
  async function () {
    try {
      let currentTimeDate = new Date();
      if (!lastRunTime || currentTime - lastRunTime >= 50 * 60 * 1000) {
        // 50 minutes in milliseconds
        const zohoToken = await zohoService.getZohoToken();
        await zohoService.updateHerokuConfigVar(zohoToken);
        console.log(`***** Zoho Access Token Updated at ${currentTimeDate.toLocaleString()} *****`);
        lastRunTime = currentTime;
      }
    } catch (err) {
      console.error(err);
    }
  },
  {
    scheduled: true,
    timezone: 'Israel',
  },
);

module.exports = {
  dailyAssetPriceNisUpdate,
  getZohoRefreshToken,
};
