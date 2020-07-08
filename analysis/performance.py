import matplotlib.pyplot as plt 
import json

data = json.loads(open('data/combinedWebsiteData.json').read())

# Performance
p = []
# download size 
for dataPoint in data:
        print(dataPoint['site'])
        print(dataPoint['performance'])
        Performance = float(dataPoint['performance'])*100
        p.append(Performance)


# plotting points as a scatter plot 
# setting the ranges and no. of intervals 
range = (0, 100) 
bins = 20 
  
# plotting a histogram 
plt.hist(p, bins, range, color = '#ff8f00', 
        histtype = 'bar', rwidth = 0.8) 
  
# x-axis label 
plt.xlabel('Performance') 
# frequency label 
plt.ylabel('No. of websites') 
# plot title 
plt.title('Website Performance') 
  
# function to show the plot 
plt.show() 