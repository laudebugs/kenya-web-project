"""
This script combines the data Obtained from Alexa with reports generated from 
Lighthouse.
"""

import json
from os import listdir
from os.path import isfile, join

# Read the file containing data obtained from Alexa
with open('data/websiteData.json', 'r') as myfile:
    data = json.loads(myfile.read())

# Read the file containing Lighthouse reports
output = open('data/combinedWebsiteData.json', 'a')

# add an opening bracket
output.write('[')

# loop through each website data
for siteInfo in data:
    # get the site address
    site = siteInfo["site"]
    # load the website report generated from lighthouse
    lighthouseReport = json.loads(
        open('data/complete-reports/'+'www_'+site.replace(".", "_")+".json").read())
    # add the performance to the website information
    siteInfo['performance'] = lighthouseReport['categories']['performance']['score']
    size_string = lighthouseReport["audits"]["total-byte-weight"]["displayValue"].split(
        " ")
    size = size_string[len(size_string)-1]
    # Add the size of the page to the site info
    siteInfo['Size of page downloaded'] = size.encode("ascii", "ignore")
    # Write the combined info of the site to the output file
    output.write(json.dumps(siteInfo)+",")

# Add a closing bracket
output.write("]")

# close the files
output.close()
myfile.close()
