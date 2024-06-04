const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://tst.hbo-ict.dev",
    includeShadowDom: true,
    screenshotOnRunFailure: false,
    video: false,
    supportFile: false
  },
});
