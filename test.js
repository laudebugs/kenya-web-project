import launchChromeAndRunLighthouse from "./launchChromeAndRunLighthouse";
const fs = require("fs");

const configJson = JSON.parse(fs.readFileSync("config.json"));
// const flags = { onlyCategories: ['performance'] };

var content = "";
try {
  content = fs.readFileSync("websiteData.csv", "utf8");
} catch (e) {
  console.log("Error", e.stack);
}
let data = content.split("\n");

let performanceOutput = "";

data.splice(1, 5).forEach((webInfo) => {
  let thisSite = webInfo;
  let parsedWebInfo = webInfo.split(",");
  console.log(parsedWebInfo);
  let website = "https://www." + parsedWebInfo[1];
  // console.log("Starting analysis on " + website);
  launchChromeAndRunLighthouse(website, configJson)
    .then((results) => {
      const parsedResults = JSON.parse(results);
      console.log(
        "size: ",
        parsedResults["audits"]["total-byte-weight"]["displayValue"].split(" ")
      );
      let performance = parsedResults.categories.performance.id * 100;
      let sizeString = parsedResults["audits"]["total-byte-weight"][
        "displayValue"
      ].split(" ");

      // let size = parseInt(sizeString[sizeString.length - 2])
      // let multiple = sizeString[sizeString.length - 1]
      // if (multiple === "KiB") {
      //   size *= 1000;
      // }
      // else if (multiple === "MiB") {
      //   size *= 1000000;
      // }

      // thisSite += ("," + performance + "," + size)
      // performanceOutput += thisSite + "\n"
      // const file = website.replace(/^https?:\/\//, "").replace(/[./]/g, "_") + "." + configJson.lighthouseFlags.output;
      // const today = new Date();
      // const folder = configJson.sortByDate ? configJson.writeTo + today.getFullYear() + "/" + (today.getMonth() + 1) + "/" : configJson.writeTo + file.replace("." + configJson.lighthouseFlags.output, "") + "/" + today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
      // const dest = folder + file;

      /*
    console.log("Writing analysis to " + dest);
    fs.mkdir(folder, { recursive: true }, (err) => {
      if (err) { console.log(err); }
      else {
        fs.writeFile(dest, results, (err) => {
          if (err) { console.log(err); }
          else { console.log("Analysis saved to " + dest) }
        });
      }
    });
    */
    })
    .catch((err) => console.log(err));
});

/*

var content = "";
try{
  content = fs.readFileSync("websiteData.csv", 'utf8');
}
catch (e){
  console.log('Error', e.stack)
}

const parsedData = content.split("\n")
const performanceOutput = ""
//Add performance and Size label
const labels = parsedData[0] + ",Performance,Size on landing Page";


// let thisSite = parsedData[1];

  let webData = parsedData[1].split(',');
  console.log(webData)
  let website = "https://" + webData[1];
parsedData.splice[2,3]
parsedData.map(webInfo =>{
  (async () => {
    log.setLevel('info');
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { output: 'json', onlyCategories: ['performance'], port: chrome.port };
  
    // let result = await lighthouse(website, options);
    const runnerResult = await lighthouse(website, options);
  
    // `.report` is the HTML report as a string
    const reportJSON = JSON.parse(runnerResult.report);
    fs.writeFileSync('lhreport.json', reportJSON);
    console.log(reportJSON["audits"]["total-byte-weight"]["displayValue"])
    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  
    await chrome.kill();
  })();
})
(async () => {
  log.setLevel('info');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { output: 'json', onlyCategories: ['performance'], port: chrome.port };

  // let result = await lighthouse(website, options);
  const runnerResult = await lighthouse(website, options);

  // `.report` is the HTML report as a string
  const reportJSON = JSON.parse(runnerResult.report);
  fs.writeFileSync('lhreport.json', reportJSON);
  console.log(reportJSON["audits"]["total-byte-weight"]["displayValue"])
  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();



 

for (let i = 1; i < 2; i++) {
  let thisSite = parsedData[i];

  let webData = parsedData[i].split(',');
  console.log(webData)
  let website = "https://" + webData[1];
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
    await chrome.kill();
  })();

}

 */
