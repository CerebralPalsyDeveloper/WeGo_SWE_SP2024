# MySQL Setup
Follow this tutorial if your team has chosen to use MySQL as your database of choice. We will also be using SQLAlchemy
for our ORM.

## Installation
First, we need to install the MySQL server package:

* `sudo apt update`
* `sudo apt install mysql-server`

Then we will want to run a security script to require a certain level of security on the passwords of MySQL users as well as enable other security features:

* `sudo mysql_secure_installation`

First you will be asked if you want to set up password validation, to which you should respond yes or y.  You will then be asked to choose an option for level of security. **Choose 1 or 2 for this.**

Next you will be prompted to set up a password for the root account. Make sure you write this down somewhere. 

Finally, there will be a few prompts, all of which you should respond yes or y to. If this was successful, you can move on to the next step.

## Database Users
Now that security is configured, we want to set up two MySQL user accounts: one for developers, and one for Python access. Each of these will have different privileges based on what we need them to do.

Before creating users however, we need to login as root and create a database to assign privileges to.  You can replace “your_team_database” with whatever name you think is best:

* `sudo mysql`
* `CREATE database your_team_database;`

Now that we have a database, we can create our users.

### Developer User:
Creating a MySQL user is a fairly simple process, taking only four lines:

* `USE mysql;`
* `CREATE USER 'developer'@'localhost' IDENTIFIED BY 'passwordgoeshere';`
* `GRANT SELECT, INSERT, DELETE, UPDATE ON your_team_database.* TO`
* `'developer'@'localhost';`
* `FLUSH PRIVILEGES;`

### Python User:
This user will be used exclusively by the Python code to access the database, **so the username and password will be very important to write down and share with your full stack developer for later**. Creating this user will use the same commands as the developer user, but excluding DELETE so our code can’t go deleting our database entries.

* `CREATE USER 'python'@'localhost' IDENTIFIED BY 'passwordgoeshere';`
* `GRANT SELECT, INSERT, UPDATE ON your_team_database.* TO 'python'@'localhost';`
* `FLUSH PRIVILEGES;`

Finally, you can use the `exit;` command to log out of root, then test logging into both of these accounts with the command:

* `mysql -u username -p`

and then entering the correct password for the user.

With how the database is currently configured, python can only SELECT, INSERT, and UPDATE and will be used exclusively by code. developer has the same permissions as python with the addition of DELETE, and is used to manually modify the data inside the database. Finally, to CREATE or DROP tables and databases, root access is required.

For information on more privileges, the MySQL documentation can be found [here](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html).

This marks the end of almost all the setup tutorials. 

* If you are configuring your test droplet in Sprint 1, you're done!
* If you are configuring your actual development environment, please be sure you follow the tutorial for multiple users to ensure that your team can transition between roles smoothly.

## SQLAlchemy 
This [tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-flask-sqlalchemy-to-interact-with-databases-in-a-flask-application) will show an example of how to use SQLAlchemy with Flask.  