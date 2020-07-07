/**
 * this script uses a lot of memory - think of it as opening 500 tabs and actively using them ast he same time
 * And thus, it is recommended that you slice the array of data into chuks of 10 or 20 at a time or
 * use an online server such as AWS or Google Cloud or Azure
 */

// import modules
const lh = require("./launchChromeAndRunLighthouse");
const fs = require("fs");
const configJson = JSON.parse(fs.readFileSync("scripts/config.json"));

// An empty array to hold the data
var data = [];
try {
  data = JSON.parse(fs.readFileSync("data/missingSites.json", "utf8"));
} catch (e) {
  console.log("Error", e.stack);
}

// Loop through all the websites to generate lighthouse reports
data.forEach((thisOne) => {
  // obtain the website address
  var address = "https://www." + thisOne.site;
  console.log("Starting analysis on " + address);

  // run lighthouse
  lh.launchChromeAndRunLighthouse(address, configJson)
    .then((results) => {
      // the destination file
      const file =
        address.replace(/^https?:\/\//, "").replace(/[./]/g, "_") +
        "." +
        configJson.lighthouseFlags.output;
      // the destination folder
      const folder = configJson.sortByDate
        ? configJson.writeTo + "data/complete-reports" + "/"
        : configJson.writeTo +
          file.replace("." + configJson.lighthouseFlags.output, "") +
          "/" +
          "data/complete-reports" +
          "/";
      //link the path
      const dest = folder + file;

      // write the report to the output  file
      console.log("Writing analysis to " + dest);
      fs.mkdir(folder, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.writeFile(dest, results, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Analysis saved to " + dest);
            }
          });
        }
      });
    })
    .catch((err) => console.log(err));
});
