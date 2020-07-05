## Generating the Reports
Since my computer crawled at even the thought of running lighthouse on 500 websites, I decided to run the ```runLightHouse.js``` script on AWS.
Here are the steps for creating an AWS instance:
1. After Creating an Amazon AWS account, 
2. Create an EC2 instance. You can proceed with launching an instance that contains the free tier. 
   - ```Launch instance > Amazon Linux (with Free tier eligible) > General Purpose Instance Type > Choose an Existing Key-pair for ssh into your instance or download a new instance >Launch instance```
   - I however created an instance type with a GPU (just for fun) and to perform lighthouse processes fast. (this cost a couple of cents/hr)
3. SSH into your instance:
   1. move your .pem file into the come folder
        - Assuming you downloaded the .pem file to the downloads folder:
        ```bash
        # cd into the root directory
        cd 

        # check whether a .ssh folder exists
        ls -al
        
        # if it doesn't, create the folder
        mkdir .ssh

        #move the .pem file into the .ssh folder. Here assume I call my .pem file myKeyPair
        mv [path where the .pem file exists]/myKeyPair.pem myKeyPair.pem
        
        # change the permissions of the .pem file
        chmod 400 .ssh/myKeyPair.pem

        # 
        ```
    2. Copy your public ip from your AWS instance - this is usually located at your instances page when you click on your instance
    3. SSH into your instance
        ```bash
        # replace [my public ip with the actual ip]
        ssh -i ~/.ssh/myKeyPair.pem ec2-user@[my public ip]

        # you may be asked whether to type yes or no to proceed. Type yes to proceed
        ```
4. Prepare the server to run your script
    1. install git
    ``` bash
    
    sudo yum install git -y
    ```
    2. [install npm using Amazon's instructions](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
    3. Install latest version of npm
        ```bash
        npm install -g npm@latest
        ```
    4. Install Chrome. I referenced [this article](https://intoli.com/blog/installing-google-chrome-on-centos/)
        ```bash
        curl https://intoli.com/install-google-chrome.sh | bash
        ```
5. Running the script
    1. Clone the repo
        ```bash
        git clone https://github.com/lbugasu/kenya-web-project.git
        # enter project folder
        cd kenya-web-project
        ```
    2. Install packages
        ```bash
        npm i
        ```
### References
