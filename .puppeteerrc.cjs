const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  chrome: {
    skipDownload: true, // Prevent Puppeteer from downloading its own version of Chrome
  },
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'), // Set the custom cache directory
};
