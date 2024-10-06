const currencyExchange = require('./currencyExchange');
const zohoService = require('./zohoService');
const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const dailyAssetPriceNisUpdate = cron.schedule(
  '0 0 * * *',
  async function () {
    try {
      let currentTimeDate = new Date();
      console.log(`***** Daily nis asset price update STARTED at: ${currentTimeDate.toLocaleString()} *****`);
      const euroToNisRate = await currencyExchange.euroToNisExchange();
      console.log('1 Euro = ' + euroToNisRate + ' Nis');
      const assets = await Asset.find({});
      for (let asset of assets) {
        if (asset.price !== undefined) {
          const newPriceNis = asset.price * euroToNisRate;
          await Asset.updateOne({ id: asset.id }, { $set: { priceNis: Math.floor(newPriceNis) } });
          await enAsset.updateOne({ id: asset.id }, { $set: { priceNis: Math.floor(newPriceNis) } });
        }
      }
      console.log(`***** Daily nis asset price update ENDED successfully at: ${currentTimeDate.toLocaleString()} *****`);
    } catch (err) {
      console.error(err);
    }
  },
  {
    scheduled: true,
    timezone: 'Israel',
  },
);

const getZohoRefreshToken = cron.schedule(
  '20,50 * * * *',
  async function () {
    try {
      let currentTimeDate = new Date();
      const zohoToken = await zohoService.getZohoToken();
      await zohoService.updateHerokuConfigVar(zohoToken);
      console.log(`***** Zoho Access Token Updated at ${currentTimeDate.toLocaleString()} *****`);
    } catch (err) {
      console.error(err);
    }
  },
  {
    scheduled: true,
    timezone: 'Israel',
  },
);

// Daily PDF deletion task
const deleteOldPDFs = cron.schedule(
  '0 1 * * *', // This will run every day at 1am
  async function () {
    try {
      const pdfDirectory = path.join(__dirname, '../public/pdf');
      const files = await fs.promises.readdir(pdfDirectory);

      const deletePromises = files.map((file) => {
        const filePath = path.join(pdfDirectory, file);
        return fs.promises
          .unlink(filePath)
          .then(() => {
            console.log(`Deleted PDF file: ${file}`);
          })
          .catch((err) => {
            console.error(`Error deleting file ${file}:`, err);
          });
      });

      await Promise.all(deletePromises);
      console.log(`***** Daily PDF deletion completed successfully at: ${new Date().toLocaleString()} *****`);
    } catch (err) {
      console.error('Error reading PDF directory:', err);
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
  deleteOldPDFs,
};
