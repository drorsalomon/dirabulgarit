const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const assetRouter = require('./routes/assetRoutes');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const commercialRouter = require('./routes/commercialRoutes');
const landingRouter = require('./routes/landingRoutes');
const blogRouter = require('./routes/blogRoutes');
const apiRouter = require('./routes/apiRoutes');
const enViewRouter = require('./routes/enViewRoutes');
const enAssetRouter = require('./routes/enAssetRoutes');
const enProjectRouter = require('./routes/enProjectRoutes');
const enCommercialRouter = require('./routes/enCommercialRoutes');
const enBlogRouter = require('./routes/enBlogRoutes');
const { dailyAssetPriceNisUpdate, getZohoRefreshToken, deleteOldPDFs } = require('./services/cronJobs');

// Start express app
const app = express();

dotenv.config({ path: './config.env' });

// Global Middlewares

// Use bodyParser.json() middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '100kb' }));

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
        // Add 'blob:' to allow blob URLs in the iframe
        frameSrc: ["'self'", 'blob:', 'https://calendly.com', 'https://www.youtube.com/', 'http://127.0.0.1:8000'],
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
          'https://analytics.google.com',
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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Trust proxy settings
app.set('trust proxy', 1); // Trust the first proxy if behind a reverse proxy (like Nginx)

app.use(
  session({
    secret: 'language',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB.replace('<password>', process.env.DB_PASSWORD),
      collectionName: 'sessions',
    }),
    cookie: {
      secure: true, // Only send the cookie over HTTPS
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
    },
  }),
);

app.use((req, res, next) => {
  if (!req.session.language) {
    req.session.language = 'he'; // Default language is 'he'
  }
  res.locals.lang = req.session.language;
  next();
});

app.post('/select-language', (req, res) => {
  req.session.language = req.body.language;
  res.locals.lang = req.session.language;
  res.status(200).json({ status: 'success' });
});

// Hebrew
app.use('/', viewRouter);
app.use('/asset', assetRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/commercial', commercialRouter);
app.use('/blog', blogRouter);
app.use('/landing', landingRouter);
app.use('/api', apiRouter);
// English
app.use('/en', enViewRouter);
app.use('/en/asset', enAssetRouter);
app.use('/en/project', enProjectRouter);
app.use('/en/commercial', enCommercialRouter);
app.use('/en/blog', enBlogRouter);

dailyAssetPriceNisUpdate.start();
getZohoRefreshToken.start();
deleteOldPDFs.start();

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
