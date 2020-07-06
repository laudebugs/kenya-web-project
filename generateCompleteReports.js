const lh = require("./launchChromeAndRunLighthouse");
const fs = require("fs");
const configJson = JSON.parse(fs.readFileSync("config.json"));

var data = [];
try {
  data = JSON.parse(fs.readFileSync("websiteData.json", "utf8"));
} catch (e) {
  console.log("Error", e.stack);
}

data.splice(0, 5).forEach((thisOne) => {
  var address = "https://www." + thisOne.site;
  console.log("Starting analysis on " + address);
  lh.launchChromeAndRunLighthouse(address, configJson)
    .then((results) => {
      const file =
        address.replace(/^https?:\/\//, "").replace(/[./]/g, "_") +
        "." +
        configJson.lighthouseFlags.output;
      const folder = configJson.sortByDate
        ? configJson.writeTo + "complete-reports" + "/"
        : configJson.writeTo +
          file.replace("." + configJson.lighthouseFlags.output, "") +
          "/" +
          "complete-reports" +
          "/";
      const dest = folder + file;

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
