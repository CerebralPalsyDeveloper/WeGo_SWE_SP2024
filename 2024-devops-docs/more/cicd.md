# Setting Up a Pipeline for CI/CD
There are many different pipelines and methods you can use for CI/CD, but for this course, we'll be using very simple BitBucket Pipelines in order to ssh into the droplet and run deploy scripts that you need to have already set up.

Note that this setup is **repository specific** and will need to be done for *every* repository that you wish to deploy automatically.

## Enabling Pipelines
In BitBucket, select the repository that you want to set up CI/CD for, and open the repository settings in the sidebar.

Next, scroll down in the sidebar until you see the pipelines section pictured below:

![pipeline settings](/devops/more/screenshots/pipeline-settings.png)

In the pipelines section, select settings, and click the slider to enable pipelines. You can ignore the button to set up a pipeline from their template as one will be provided later in the tutorial.

## Adding Repository Variables
Once again in the "pipelines" section of the repository settings, there should be an option for repository variables. You'll need to add a few of these depending on the repository.

* First, add a variable named `USER` and in the value section put the name of **your user** on the desired droplet.
    * Keep track of which user you use here. It will be very important later. I recommend just using your personal user to ensure proper permissions.
* Next, you'll need to create one or two variables for the server(s) that the repository will need to be deployed on. Name these `DEMAND_SERVER` and `SUPPLY_SERVER` and for the values, put the **domain** of the appropriate server.

## Generating an SSH Key for the Repository
Once again under the "pipelines" section of the repository settings, select the option for `SSH keys`.

In the "known hosts" section of the page, enter the domain of each server the repository will need to be deployed on. These should be the same as the domains you entered into the variables and click "fetch" to see the fingerprint, then click "add host" to add the server to the list of known hosts.

Now, Click the "Generate keys" button in order to generate an RSA key for the repository. This key will be used to authenticate the pipeline to the droplet. Go ahead and copy the public key.

### On the Appropriate Droplet(s)
Log in to the **same user** that you used on the repostory variables (it is very important that you use the same user) and navigate to your authorized_keys file.


`cd ~/.ssh/authorized_keys`

Then paste the public key you copied from BitBucket. The repository should now be able to authenticate to the droplet.

## Adding Deployments
Once again in the "pipelines" section of the repository settings, open the "deployments" option. Under the production section, you can add deployments for any servers that you will need to deploy the repository to. Be sure to keep track of the names you use, as they will be important for the next step.

## Creating the Pipeline
Clone the repository you are working with to your machine, and inside the repository create a file named `bitbucket-pipelines.yml`

Make sure the file has the exact name, then inside the file paste and modify the following template:

```yml
image: atlassian/default-image:2

pipelines:
  branches:
    branch-name-to-trigger-pipeline:
    - step:
       name: NameOfPipeline
       deployment: DeploymentName
       script:
         - pipe: atlassian/ssh-run:0.2.2
           variables:
             SSH_USER: USER VARIABLE
             SERVER: SERVER VARIABLE
             COMMAND: './NameOfDeployScript.sh'
```

You will need to change the line `branch-name-to-trigger-pipeline:` to the name of the branch that you wish to trigger this pipeline. Any push, pull, or merge into this branch will cause the pipeline to run. 

You will then need to set the `DeploymentName` to one of the deployments you created previously.

Also, make sure you use the appropriate variables for `SHH_USER` and `SERVER`. These should be the repository variables you set earlier, and they can be accessed with a $ like so: `$USER`.

Finally, change `NameOfDeployScript` to the name of the appropriate deploy script that I have instructed you to make before this tutorial. Depending on the location of the script, you may have to use an absolute path rather than just the script name.

For any repositories that need to be deployed on both servers, simply copy the portion starting with `- step:` and change anything you need to match the info on the other server.

You should now be able to commit this file and push it to the repository. When you've pulled it into the appropriate branch, the deployment should run and hopefully work.

## Troubleshooting
If your pipeline isn't working, open the repository you're working with in BitBucket, and click the "pipelines" option in the sidebar. This should show you the pipelines that are running/have run, and if you select one it should include any errors produced.

Due to the complex nature of this and the many hidden variables to keep track of, I will not be able to help you troubleshoot beyond simple issues. Please keep track of your variables and be careful.