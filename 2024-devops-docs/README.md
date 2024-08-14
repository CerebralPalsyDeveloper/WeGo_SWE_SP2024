# DevOps
DevOps stands for Development and Operations. The role falls between IT staff and sofware developers. The primary focus of the DevOps role is to create and stabilize the deployment environment of the software rather than actually implementing the code itself. You can read more about DevOps engineers [here](https://medium.com/edureka/devops-engineer-role-481567822e06) if the role sounds interesting to you.

In terms of this project, DevOps is a highly technical role and will be responsible for setting up a stable cloud environment and working with many other teammates in order to deploy their code to the environment. DevOps involves a lot of commandline use. I will provide many of the necessary commands in these instructions, but I strongly recommend familiarizing yourself with Linux commands so you can streamline the process.

Following these instructions, you will learn the basics of how to set up a basic test cloud environment. You will then apply this knowledge in Sprint 2 by configuring your actual cloud environment. Use the first test as a way to work out some of the kinks so you can hit the ground running.

Throughout these tutorials, I will be providing you with many commands. I strongly recommend typing these commands yourself one at a time while reading from the tutorial rather than copy/pasting them. This is because occasionally copy/paste will result in odd symbols being placed into the command and it will no longer work. If something I provide to you is not working, try retyping it to make sure.

For more commands: [Linux Command Cheat Sheet](https://www.guru99.com/linux-commands-cheat-sheet.html)

Finally, know that you are **not guaranteed to be the only DevOps** on your team, so you will be responsible for **writing your own documentation** to assist your teammates in configuring new clouds or accessing the cloud that you have configured. Use the initial test as a sandbox to familiarize yourself with the process and document it.

## Initial Connection and Creating a New User
The first step in setting up a cloud environment is to connect to the Droplet and create a user account for yourself to avoid using root for everything.  To begin, we will be creating a unique ssh key that you will use to connect to the Droplet from this point forward.

Open a PowerShell (Terminal on Mac) window and run the command below to generate an ssh key that you can use to connect to your cloud:

* `ssh-keygen -t rsa -b 4096` 

When asked to enter a name, name the file something unique to you.  I named mine `.ssh/krohwer_rsa` for example.  You will be prompted to enter a passphrase, just hit enter to skip.

Once you've generated a key, make sure you send the `.pub` version to a TA if you are the first DevOps on the cloud, or to your DevOps team member if the cloud is already configured.

Now log in to the server using this command, replacing `[domain]` with the domain of the appropriate cloud:

* `ssh -i ~/.ssh/your_rsa root@[domain]`

Domains have already been set up by your TAs and follow the standard format of `swe2023teamXX.xyz`

The next block of commands will go through creating a user and giving it the proper permissions.
```
$ adduser <user_name> 		## enter a password and write it down
$ usermod -aG sudo <user_name>
$ su <user_name>			## switches to the new user
$ cd ~
$ sudo mkdir .ssh     		## enter your password
$ sudo chown -R <user_name>:<user_name> .ssh
$ sudo chmod 700 .ssh
```

Now you will be adding your public key to the authorized_keys file.  To find the public key you created, look in `C:/Users/<your user>/.ssh/` for the file you created earlier.  Mine was `krohwer_rsa.pub`.  If you can�t find that file, look in `C:/Users/<your user>/` instead.

Open this file in a text editor (I used notepad++, but any text editor should do) and copy the entire contents.  Back in the server terminal, type these commands:

* `cd ~/.ssh`
* `nano authorized_keys`

Then paste the public key you copied into the file.  You may have to create a new line if there is a key already entered.  Save the file with ctrl + O, hit enter to confirm the name, and close the file with ctrl + X.

You should now be able to login as the user you created instead of root using the command:

* `ssh -i your_rsa user_name@[domain]`

The rest of this tutorial should be followed as this user account since it's not good practice to use root regularly.

## Firewall Configuration
Ubuntu 22.04 servers can use the UFW firewall to ensure only connections to certain services are allowed. You can set up a basic firewall using this application.

Applications can register their profiles with UFW upon installation. These profiles allow UFW to manage these applications by name. OpenSSH, the service that allows you to connect to your server, has a profile registered with UFW.

You can examine the list of installed UFW profiles by typing:
````
ufw app list
````
````
Output:
Available applications:
    OpenSSH
````
You will need to make sure that the firewall allows SSH connections so that you can log into your server next time. Allow these connections by typing:
````
ufw allow OpenSSH
````
Now enable the firewall by typing:
````
ufw enable
````
Type y and press ENTER to proceed. You can see that SSH connections are still allowed by typing:
````
ufw status
````
````
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
````
The firewall is currently blocking all connections except for SSH. If you install and configure additional services, you will need to adjust the firewall settings to allow the new traffic into your server.

## Git Configuration Tutorial
* [Git Setup](/python/git-setup.md)
## Systemd Configuration Tutorial
* [Systemd Setup](/systemd/systemd-setup.md)
## WebStack Configuration Tutorial
* [WebStack Setup](/webStack/flask-gunicorn-nginx.md)
## Database Configuration Tutorials
* [MySQL Setup](/database/mysql-setup.md)
## Multiple Users & More Configuration Tutorials
* [Multiple Users Tutorial](/more/final-setup.md)
## CI/CD Pipeline Setup
* [CI/CD Pipelines](/more/cicd.md)