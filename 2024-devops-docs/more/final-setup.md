# Additional Configuration Requirements
This tutorial includes some of the more advanced steps that will help your team go above and beyond and be prepared to change roles.

## Developer User Group
One of the ways we can improve our cloud environment is by setting up a user group for all developers that will need to test code on the server.

First, create the group using the command:

* `sudo groupadd developer`

Then, create a user account for each of your teammates that wants to test code (if they don't already have one) and add them to the group with the command:

* `sudo adduser keaton developer`
* `sudo adduser cristina developer`

Be sure to add yourself to the group as well.

### Giving the Group Ownership and Permissions
To make sure your team members have appropriate access, you'll need to give the user group ownership and permissions to all the files they'll need to access.

The first of these files are your repositories. Navigate to the directory that holds your repository directory (`/home/teamXX` if you followed the previous tutorials) and use the commands

* `sudo chown -R $USER:developer repos`
* `sudo chmod -R 775 repos`

This will give everyone in the developer group read, write, and execute permissions to all of your repositories, which is very important if they need to pull code to the cloud.

The next set of files that you need to provide access to is your python environment. Navigate to where you placed your Python environment, and use the following commands to give all developers the appropriate access.

* `sudo chown -R $USER:developer your_environment_name`
* `sudo chmod -R 775 your_environment_name`

NOTE: In order to fully allow your teammates to pull code onto your cloud, you will need to set up SSH Cloning with Bitbucket.

## SSH Cloning with BitBucket
**BEFORE YOU BEGIN:** You will need to contact a TA in order to get administrator access to your BitBucket workspace before you proceed.

Once you have administrator access to your workspace, you can begin adjusting the settings, which will allow you to add the SSH keys necessary for this section of the tutorial.

### Creating an SSH Key on the Cloud
First, sign in on the cloud and generate an SSH key for your user:

* `ssh-keygen -t rsa -b 4096`

Hit enter twice to skip the passphrase, then name your key `/home/your_user/.ssh/bitbucket_rsa`, replacing your_user with your actual username.

Now you'll want to retrieve the public key:

* `cd ~/.ssh`
* `cat bitbucket_rsa.pub`

Copy the contents of the terminal, which should start with `ssh-rsa` and end with your user, then you'll have to add that public key to your ssh keys on BitBucket.

Start by going to your BitBucket workspace, which you should have bookmarked somewhere. If not, sign in to BitBucket and click your icon in the bottom left. This should show you some recent workspaces. Upon opening this, you should see something similar to the image below, in which case, click the settings option that I circled:

![](https://i.imgur.com/YKaLKgs.png)

**If you can't see the settings, you may not be a workspace admin**

Now find the SSH Keys section as shown below:

![](https://i.imgur.com/0QUaxyZ.png)

Next, click on the add key button, label your key something descriptive, (like Keaton Demand SSH) and paste the contents you copied from `bitbucket_rsa.pub` into the key section. You can then click the add key button to confirm, and you should see your newly added key in the list.

Now that your key is added, you should add it to the bottom of your `.profile` on the cloud.

Start by signing in as your user, then use the following commands to open the file:

* `cd ~`
* `sudo nano .profile`

then add the following lines to the bottom of the file:
```
eval `ssh-agent`
ssh-add /home/your_user/.ssh/bitbucket_rsa
```
Finally, just refresh your .profile:

* `source .profile`

**NOTE: ANYONE who wants to pull code on the cloud themselves needs to follow the previous steps.**

### Cloning Repos using SSH
The next step of this process is to clone the repos using SSH, so they can be pulled using SSH. This step only needs to be done by the DevOps member.

Doing this is quite simple. First, grab the clone link for the repository on BitBucket by selecting the repo and hitting the clone button in the top right. In the popup, make sure the setting in the top right is set to SSH (not HTTPS), then copy the clone command provided.

![](https://i.imgur.com/yTUWlxI.png)

Now, log into your cloud, navigate to your repos directory (`/home/teamXX/repos`) and paste the command to clone the repository.

Repeat this for all repositories that belong on that cloud.

If everything was done correctly, you should now be able to pull code to the cloud without needing to enter your BitBucket password, and your cloud is set up to better support multiple users. 

If any teammates wish to pull code onto the cloud to test, create a user account for them, add them to the developer group, then instruct them to log in as their user and generate a key like in this tutorial. You can then add their key to BitBucket as instructed and then they will be able to pull code.