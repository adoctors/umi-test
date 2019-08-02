module.exports = {
  testURL: 'http://localhost:9001',
  preset: 'jest-puppeteer',
  extraSetupFiles: ['./tests/setupTest.js'],
  // "setupFilesAfterEnv": ["<rootDir>tests/setupTest.js"],
  // globals: {
  //   ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
  // },
};
