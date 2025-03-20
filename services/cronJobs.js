const currencyExchange = require('./currencyExchange');
const zohoService = require('./zohoService');
const Asset = require('../models/assetModel');
const enAsset = require('../models/enAssetModel');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_BUCKET_REGION;
const myBucket = process.env.AWS_BUCKET_NAME;

// Set S3 configurations
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

// const dailyAssetPriceNisUpdate = cron.schedule(
//   '0 0 * * *',
//   async function () {
//     try {
//       let currentTimeDate = new Date();
//       console.log(`***** Daily nis asset price update STARTED at: ${currentTimeDate.toLocaleString()} *****`);
//       const euroToNisRate = await currencyExchange.euroToNisExchange();
//       console.log('1 Euro = ' + euroToNisRate + ' Nis');
//       const assets = await Asset.find({});
//       for (let asset of assets) {
//         if (asset.price !== undefined) {
//           const newPriceNis = asset.price * euroToNisRate;
//           await Asset.updateOne({ id: asset.id }, { $set: { priceNis: Math.floor(newPriceNis) } });
//           await enAsset.updateOne({ id: asset.id }, { $set: { priceNis: Math.floor(newPriceNis) } });
//         }
//       }
//       console.log(`***** Daily nis asset price update ENDED successfully at: ${currentTimeDate.toLocaleString()} *****`);
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: 'Israel',
//   },
// );

// const getZohoRefreshToken = cron.schedule(
//   '20,50 * * * *',
//   async function () {
//     try {
//       let currentTimeDate = new Date();
//       const zohoToken = await zohoService.getZohoToken();
//       await zohoService.updateHerokuConfigVar(zohoToken);
//       console.log(`***** Zoho Access Token Updated at ${currentTimeDate.toLocaleString()} *****`);
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: 'Israel',
//   },
// );

// Daily PDF deletion task
const deleteOldPDFs = cron.schedule(
  '0 1 * * *', // This will run every day at 1am
  async function () {
    try {
      console.log(`***** Daily S3 PDF deletion STARTED at: ${new Date().toLocaleString()} *****`);

      // Specify the folder path in S3 where PDF files are stored
      const pdfFolder = 'pdf/';

      // Step 1: List the PDF files in the S3 bucket
      const listParams = {
        Bucket: myBucket,
        Prefix: pdfFolder, // The folder path to list objects in the S3 bucket
      };

      // Retrieve the list of PDFs in the folder
      const { Contents } = await s3.send(new ListObjectsV2Command(listParams));

      // Step 2: Check if there are any PDFs to delete
      if (!Contents || Contents.length === 0) {
        console.log('No PDF files found in the S3 bucket for deletion.');
        return;
      }

      // Step 3: Prepare the delete parameters
      const deleteParams = {
        Bucket: myBucket,
        Delete: {
          Objects: Contents.map((item) => ({ Key: item.Key })), // Map each file key for deletion
        },
      };

      // Step 4: Delete the PDFs from the S3 bucket
      await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log(`Deleted PDF files from S3 folder: ${pdfFolder}`);
      console.log(`***** Daily S3 PDF deletion completed successfully at: ${new Date().toLocaleString()} *****`);
    } catch (err) {
      console.error('Error deleting PDF files from S3:', err);
    }
  },
  {
    scheduled: true,
    timezone: 'Israel',
  },
);

module.exports = {
  // dailyAssetPriceNisUpdate,
  // getZohoRefreshToken,
  deleteOldPDFs,
};
