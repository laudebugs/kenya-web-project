const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
module.exports = {
  launchChromeAndRunLighthouse: function (url, opts, config = null) {
    return chromeLauncher
      .launch({ chromeFlags: opts.chromeFlags })
      .then((chrome) => {
        console.log("Launching lighthouse for " + url);
        opts.lighthouseFlags.port = chrome.port;
        return lighthouse(url, opts.lighthouseFlags, config).then((res) => {
          console.log("Parsing report for " + url);
          return chrome.kill().then(() => res.report);
        });
      });
  },
};
