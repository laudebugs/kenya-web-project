"""
I ran this script to find websites that were skipped in running lighthouse.

It will print out a json file of the missing sites
"""

import json
from os import listdir
from os.path import isfile, join

# Open the file containing all the websites
with open('data/websiteData.json', 'r') as myfile:
    data = myfile.read()

# All the websites to parse
allWebsites = json.loads(data)

# Read the folder containing generated reports
onlyfiles = [f for f in listdir(
    'data/complete-reports') if isfile(join('data/complete-reports', f))]

# An array to hold missing websites
missing = []
# The file to hold the missing websites
file = open('data/missingSites.json', 'a')

# Add an opening bracket
file.write("[")

# loop through all the websites
for w in allWebsites:
    # check if the website has a corrensponding report
    if(("www_"+w['site'].replace(".", "_")+".json")not in onlyfiles):
        # if not, add the website data to the missing file
        file.write(str(json.dumps(w)))
        # Separate the json files for each file with a comma
        if(w != allWebsites[len(allWebsites)-1]):
            file.write(",")

# Add an enclosing bracket
file.write("]")

# close the files
myfile.close()
file.close()
