const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require("fs");
const { Console } = require('console');

const configJson = JSON.parse(fs.readFileSync("config.json"));

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    // console.log("Launching lighthouse for " + url);
    opts.lighthouseFlags.port = chrome.port;
    return lighthouse(url, opts.lighthouseFlags, config).then(res => {
      console.log("Parsing report for " + url);
      return chrome.kill().then(() => res.report);
    });
  });
}

var content = "";
try{
  content = fs.readFileSync("websiteData.csv", 'utf8');
}
catch (e){
  console.log('Error', e.stack)
}
let data = content.split("\n");
fs.appendFile('out.csv', data[0]+",Perfomance,Data Transfer On Site Load\n", function (err) {
  if (err) throw err;
  console.log('Updated Labels');
});
data.splice(1,5).forEach(thisOne => {

  var address = "https://www."+thisOne.split(',')[1]

  launchChromeAndRunLighthouse(address, configJson).then(results => {
    console.log(((parseInt(thisOne[0])/data.length)*100)+"% done" )
    const parsedResults = JSON.parse(results);

    let performance = parsedResults.categories.performance.score * 100;
    let sizeString = parsedResults["audits"]["total-byte-weight"]["displayValue"].split(" ")
    let size = sizeString[sizeString.length - 1]


    let thisSite = (thisOne +"," + performance + "," + size + "\n")
    fs.appendFile('out.csv', thisSite, function (err) {
      if (err) throw err;
    });

  }).catch(err => console.log(err));
});
