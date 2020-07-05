const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const { Console } = require("console");

const configJson = JSON.parse(fs.readFileSync("config.json"));

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      // console.log("Launching lighthouse for " + url);
      opts.lighthouseFlags.port = chrome.port;
      return lighthouse(url, opts.lighthouseFlags, config).then((res) => {
        console.log("Parsing report for " + url);
        return chrome.kill().then(() => res.report);
      });
    });
}

var data = [];
try {
  data = JSON.parse(fs.readFileSync("websiteData.json", "utf8"));
} catch (e) {
  console.log("Error", e.stack);
}

console.log(data.splice(1, 5));
data.splice(1, 5).forEach((thisOne) => {
  var address = "https://www." + thisOne.site;

  launchChromeAndRunLighthouse(address, configJson)
    .then((results) => {
      const parsedResults = JSON.parse(results);

      let performance = parsedResults.categories.performance.score * 100;
      let sizeString = parsedResults["audits"]["total-byte-weight"][
        "displayValue"
      ].split(" ");
      let size = sizeString[sizeString.length - 1];
      thisOne["performance"] = performance;
      thisOne["size on home page load"] = size;
      fs.appendFile("out.json", JSON.stringify(thisOne), "utf8", function (
        err
      ) {
        if (err) throw err;
      });
      fs.appendFile("out.json", ",", "utf8", function (err) {
        if (err) throw err;
      });
    })
    .catch((err) => console.log(err));
});
