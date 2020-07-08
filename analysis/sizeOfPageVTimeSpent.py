import matplotlib.pyplot as plt 
import json

data = json.loads(open('data/combinedWebsiteData.json').read())

# time spent
x = []
# download size 
y = []
for dataPoint in data:
    timeString = dataPoint['daily time on site'].split(':')
    time = int(timeString[0])*60 + int(timeString[1])

    x.append(int(dataPoint['Size of page downloaded'][:-2].replace(',',''))/1024)
    y.append(time)

# plotting points as a scatter plot 
plt.scatter(x, y, label= "website", color= "purple",s=20) 
  
# x-axis label 
plt.xlabel('Time spent on Website') 
# frequency label 
plt.ylabel('size of page downloaded') 
# plot title 
plt.title('Time Spent on Website v Size of Page Downloaded') 
# showing legend 
plt.legend() 
  
# function to show the plot 
plt.show() 