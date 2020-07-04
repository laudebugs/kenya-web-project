const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');

const flags = { onlyCategories: ['performance'] };


let data = [];
fs.readFile("websiteData.csv", 'utf-8', (err, readData) => {
  if (err) throw err;
  data = readData;

  fs.writeFile('Output.txt', performanceOutput, (err) => {

    // In case of a error throw err. 
    if (err) throw err;
  })
})

console.log(data)

const parsedData = data.split("\n")
const performanceOutput = ""
//Add performance and Size label
const labels = parsedData[0] + ",Performance,Size on landing Page";

for (let i = 1; i < 2; i++) {
  let thisSite = parsedData[i];
  let webData = parsedData[i].split(',');

  let website = "https://" + webData[2];
  (async () => {
    log.setLevel('info');
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { output: 'json', onlyCategories: ['performance'], port: chrome.port };

    let result = await lighthouse(website, options);
    let sizeString = (JSON.parse(result.report)["audits"]["total-byte-weight"]["displayValue"]).split(" ");
    let size = parseInt(sizeString[sizeString.length - 2])
    let multiple = sizeString[sizeString.length - 1]
    if (multiple === "KiB") {
      size *= 1000;
    }
    else if (multiple === "MiB") {
      size *= 1000000;
    }
    let performance = result.lhr.categories.performance.score * 100;
    thisSite += ("," + performance + "," + size)
    performanceOutput += thisSite + "\n"
    console.log(thisSite)
    await chrome.kill();
  })();

}

  // (async () => {
  //   log.setLevel('info');
  //   const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  //   const options = { output: 'json', onlyCategories: ['performance'], port: chrome.port };

  //   // let result = await lighthouse(website, options);
  //   const runnerResult = await lighthouse('https://motherfuckingwebsite.com', options);

  //   // `.report` is the HTML report as a string
  //   const reportJSON = JSON.parse(runnerResult.report);
  //   fs.writeFileSync('lhreport.json', reportJSON);
  //   console.log(reportJSON["audits"]["total-byte-weight"]["displayValue"])
  //   // `.lhr` is the Lighthouse Result as a JS object
  //   console.log('Report is done for', runnerResult.lhr.finalUrl);
  //   console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  //   await chrome.kill();
  // })();