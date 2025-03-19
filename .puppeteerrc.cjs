const { join } = require('path');

module.exports = {
  chrome: {
    skipDownload: false, // Allow Puppeteer to download Chromium
  },
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
