# Kenya Web Project

For this simple project, I wanted to answer the question, are the websites that Kenyans access accessible to a populus that is keen on data consumption. I used, on average, 100MB of data and I could not afford to access websites that would use even 5MB on a single page. And therefore, the websites that used the least amount of data, but that were also fast were the ones I tended to access from day to day. WhatsApp is a good example of a situation where I would get the most value for the data I used. If I turned off automatic video and image downloads, I could spend just 10MB each day communicating with friends as opposed to using direct text messages that were more expensive (a bundle of 200 text messages from [Safaricom](https://niabusiness.com/buy-safaricom-sms-bundles/) would cost Kes 10, each with a limit of ~160 characters). Brings back memories of how I started to use short-forms like _imy_ and _gn_ among others to use every single character of a text message.

## Stages

1. Data Collection and Preparation
   I gathered data from Alexa of the 500 most popular websites in Kenya [here](rawWebsiteData.txt).<br/>
   To parse the data, I ran a simple [java script](Split.java) to transform the dataset into json format [here](websiteData.json)<br/>
   ```bash
   # compile the java program
   javac Script.java
   # run the java file
   java Script
   ```
   Now we are ready to use the dataset to generate reports
2. Generating reports. Borrowing heavily from this [multiple-lighthouse](https://github.com/sahava/multisite-lighthouse) repository, I modified the code to accept a json file that contained the websites. I have a far more detailed process on generating reports on [this blog post](). Since my personal pc didn't have the raw power to generate all the reports at once, I ran the script `runLightHouse.js` on an AWS server and generated this [file](websiteData-n-reports.json). I also stored the full lighthouse reports for all the websites [here](complete-reports).<br/>
   To generate the reports locally and append the performance score and data download onto the json defining one site:

   ```bash
   # install dependencies
   npm i
   # run script - the sampleRunLightHouse.js file will run lighthouse reports on only 5 websites
   node scripts/sampleRunLightHouse.js

   # To generate reports for all the websites, (only if you have a very powerful machine )
   node scripts/runLightHouse.js
   ```

3. Examining the data
