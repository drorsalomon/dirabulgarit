const Asset = require('../models/assetModel');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');
const axios = require('axios');
const cron = require('node-cron');
const Utils = require('../utils/utils');
const moment = require('moment');

dotenv.config({ path: './config.env' });

let currency = {
  active: 'euro',
  notActive: 'nis',
};

let euroToNis = 0;
const euroSymbol = '€';
const nisSymbol = '₪';

const euroToNisExchange = async () => {
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
};

const dailyAssetPriceNisUpdate = cron.schedule(
  '0 0 * * *',
  async function () {
    try {
      let counter = 0;
      let currentTimeDate = new Date();
      console.log(`***** Daily price update STARTED at: ${currentTimeDate.toLocaleString()} *****`);
      const euroToNisRate = await euroToNisExchange();
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

exports.setCurrency = catchAsync(async (req, res, next) => {
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
        euroToNis,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

exports.getCurrency = catchAsync(async (req, res, next) => {
  res.locals.currency = currency;

  next();
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const currencySymbol = currency.active === 'euro' ? '€' : '₪';
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('overview', {
    title: 'Overview Page',
    currencySymbol,
    euroSymbol,
    nisSymbol,
    hotAssets,
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  const currencySymbol = currency.active === 'euro' ? '€' : '₪';
  let sortOptions = { project: 1 };
  const hotAssets = await Asset.find({ hotAsset: true }).sort(sortOptions);
  if (!hotAssets) return next(new AppError('Could not find the requested hot assets!', 404));

  res.status(200).render('search', {
    title: 'Search Page',
    currencySymbol,
    euroSymbol,
    nisSymbol,
    hotAssets,
  });
});
exports.getQAndA = (req, res) => {
  res.status(200).render('qAndA');
};
exports.getInvest = (req, res) => {
  res.status(200).render('invest');
};
exports.getAbout = (req, res) => {
  res.status(200).render('about');
};

exports.getBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({});

  if (!blogs) return next(new AppError('Could not find the requested hot assets!', 404));

  for (const blog of blogs) {
    blog.sectionOneTexts[0] = Utils.limitString(blog.sectionOneTexts[0], 350);
  }

  res.status(200).render('blog', {
    title: 'Blog Page',
    blogs,
    moment,
  });
});

exports.getCalendly = (req, res) => {
  res.status(200).render('calendly');
};
exports.getPricing = (req, res) => {
  res.status(200).render('pricing');
};
exports.getPrivacy = (req, res) => {
  res.status(200).render('privacy');
};
exports.getTermsOfService = (req, res) => {
  res.status(200).render('termsOfService');
};
exports.getSiteMap = (req, res) => {
  res.status(200).render('siteMap');
};

exports.getCalendlyLead = catchAsync(async (req, res) => {
  try {
    const calendlyLeadName = req.body.payload.name;
    const calendlyLeadEmail = req.body.payload.email;
    const calendlyLeadQuestions = req.body.payload.questions_and_answers;
    const calendlyLeadEventTime = req.body.payload.scheduled_event.start_time;

    // Map the Calendly data to Zoho CRM Lead fields
    const leadData = {
      data: [
        {
          Last_Name: calendlyLeadName,
          Email: calendlyLeadEmail,
          Phone: calendlyLeadQuestions[0].answer,
          Description: `Meeting time: ${calendlyLeadEventTime} /// Additional Information: ${calendlyLeadQuestions[1].answer}`,
          Lead_Source: 'Calendly',
        },
      ],
    };

    // Send a POST request to Zoho CRM to create a new lead
    const res = await axios({
      method: 'POST',
      url: process.env.ZOHO_URL,
      data: leadData,
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(res);
  } catch (error) {
    console.error('Error creating lead in Zoho CRM:', error.data.data);
    res.status(500).send('Internal Server Error');
  }
});
