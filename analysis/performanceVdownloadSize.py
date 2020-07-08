import matplotlib.pyplot as plt 
import json

data = json.loads(open('data/combinedWebsiteData.json').read())

# Performance
y = []
# download size 
x = []
for dataPoint in data:
    # print(dataPoint['Size of page downloaded'])
    # print(dataPoint['Size of page downloaded'][:-2].replace(',',''))
    x.append(int(dataPoint['Size of page downloaded'][:-2].replace(',',''))/1024)
    y.append(dataPoint['performance'])

# plotting points as a scatter plot 
plt.scatter(x, y, label= "website", color= "green",s=30) 
  
# x-axis label 
plt.ylabel('Performance') 
# frequency label 
plt.xlabel('size of page downloaded') 
# plot title 
plt.title('Performance v Size of Page Downloaded') 
# showing legend 
plt.legend() 
  
# function to show the plot 
plt.show() 