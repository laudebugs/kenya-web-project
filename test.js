const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');

const flags = {onlyCategories: ['performance']};

(async () => {
  log.setLevel('info');
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {output: 'json', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse('https://motherfuckingwebsite.com', options);

  // `.report` is the HTML report as a string
  const reportJSON = JSON.parse(runnerResult.report);
  fs.writeFileSync('lhreport.json', reportJSON);
console.log(reportJSON["audits"]["total-byte-weight"]["displayValue"])
  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();