// import modules
const lh = require("./launchChromeAndRunLighthouse");
const fs = require("fs");
const configJson = JSON.parse(fs.readFileSync("scripts/config.json"));

// an array to hold the imported website data
var data = [];
try {
  data = JSON.parse(fs.readFileSync("data/websiteData.json", "utf8"));
} catch (e) {
  console.log("Error", e.stack);
}

// run lighthouse on a sample of the websites
data.splice(0, 5).forEach((thisSite) => {
  // append the protocol and www
  var address = "https://www." + thisSite.site;

  lh.launchChromeAndRunLighthouse(address, configJson)
    .then((results) => {
      // read the results
      const parsedResults = JSON.parse(results);
      // note the performance of the website
      let performance = parsedResults.categories.performance.score * 100;
      // obtain the size string of the data and split on spaces
      let sizeString = parsedResults["audits"]["total-byte-weight"][
        "displayValue"
      ].split(" ");
      // The size value is the last element of the array sizeString
      let size = sizeString[sizeString.length - 1];

      // Add performance and size onto the website data
      thisSite["performance"] = performance;
      thisSite["size on home page load"] = size;

      // Append the combined website data to the output file
      fs.appendFile(
        "data/sampleOutput.json",
        JSON.stringify(thisSite),
        "utf8",
        function (err) {
          if (err) throw err;
        }
      );
      fs.appendFile("out.json", ",", "utf8", function (err) {
        if (err) throw err;
      });
    })
    .catch((err) => console.log(err));
});
