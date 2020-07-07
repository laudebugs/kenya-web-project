"""
I ran this script to find websites that were skipped in running lighthouse.

It will print out a json file of the missing sites
"""
import json

from os import listdir
from os.path import isfile, join

with open('data/websiteData.json', 'r') as myfile:
    data = myfile.read()

# All the websites to parse
allWebsites = json.loads(data)

onlyfiles = [f for f in listdir(
    'data/complete-reports') if isfile(join('data/complete-reports', f))]

# print(onlyfiles)
# print(allWebsites)

missing = []
file = open('data/missingSites.json', 'a')
file.write("[")

for w in allWebsites:
    if(("www_"+w['site'].replace(".", "_")+".json")not in onlyfiles):
        file.write(str(json.dumps(w)))
        if(w != allWebsites[len(allWebsites)-1]):
            file.write(",")


file.write("]")
file.close()
