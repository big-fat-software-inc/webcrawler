function noop() {}

const options = {
  product: "chrome",
  slowMo: 1,
  headless: false,
  ignoreHTTPSErrors: true,
  defaultViewport: {
    height: 1080,
    width: 1920,
  },
};

module.exports = options;
