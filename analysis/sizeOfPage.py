import matplotlib.pyplot as plt
import json

data = json.loads(open('data/combinedWebsiteData.json').read())

# Performance
sizes = []
# download size
m = 0
for dataPoint in data:
    size = (int(dataPoint['Size of page downloaded']
                [:-2].replace(',', ''))/1024)
    sizes.append(size)
    if(size > m):
        m = size

# plotting points as a scatter plot
# setting the ranges and no. of intervals
range = (0, 20)
bins = 20

# plotting a histogram
plt.hist(sizes, bins, range, color='#ad1457',
         histtype='barstacked', rwidth=0.8)

# x-axis label
plt.xlabel('size in Megabytes')
# frequency label
plt.ylabel('No. of websites')
# plot title
plt.title('Size of the web page downloaded')

# function to show the plot
plt.show()
