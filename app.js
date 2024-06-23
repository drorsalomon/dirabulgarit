const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const assetRouter = require('./routes/assetRoutes');
//const projectRouter = require('./routes/projectRoutes');
const blogRouter = require('./routes/blogRoutes');
const apiRouter = require('./routes/apiRoutes');
const { dailyAssetPriceNisUpdate, getZohoRefreshToken } = require('./services/cronJobs');

// Start express app
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middlewares

// Set security HTTP requests
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'unsafe-inline'",
          "'self'",
          'https:',
          'http:',
          'blob:',
          'https://*.mapbox.com',
          'https://*.cloudflare.com',
          'https://assets.calendly.com',
          'https://www.youtube.com',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://ssl.google-analytics.com',
          'https://crm.zoho.com/crm/WebToLeadForm',
        ],
        frameSrc: ["'self'", 'https://calendly.com', 'https://www.youtube.com/'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: ["'self'", 'data:', 'blob:', 'https://*.tiles.mapbox.com', 'https://api.mapbox.com', 'https://events.mapbox.com', 'https://calendly.com'],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        formAction: ["'self'", 'https://crm.zoho.com/crm/WebToLeadForm'],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'blob:',
          'https://*.mapbox.com',
          'https://bundle.js:*',
          'https://calendly.com',
          'ws://127.0.0.1:*/',
          'wss://www.dirabulgarit.com:56451/',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://ssl.google-analytics.com',
        ],
        upgradeInsecureRequests: [],
      },
    },
  }),
);

// Trust the 'X-Forwarded-For' header set by the proxy
// app.set('trust proxy', true);

// // Rate limiter
// const limiter = rateLimit({
//   max: 10000,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests, please try again in 1 hour.',
// });
// app.use(limiter);

app.use(compression());

// Use bodyParser.json() middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '100kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['filter', 'sort', 'type', 'pageNumber', 'resPerPage'],
  }),
);

// Serving static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', viewRouter);
app.use('/asset', assetRouter);
//app.use('/project', projectRouter);
app.use('/blog', blogRouter);
app.use('/api', apiRouter);

dailyAssetPriceNisUpdate.start();
getZohoRefreshToken.start();

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

module.exports = app;
