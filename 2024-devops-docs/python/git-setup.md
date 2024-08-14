# Git Setup
Since your team will be collaborating on this project and multiple team members will be deploying code, it is important to set up a Git directory where all of your repositories will be cloned.

To start, ensure that your environment has Git installed by using the command:

* `git --version`

Once you have verified that you have a version of Git installed, you should create a directory for your repositories off of your home directory, so it is accessible by all users. I would recommend naming the directory after your team, like teamXX (but use your actual team number of course):

* `cd /home`
* `sudo mkdir directory-name`
* `sudo chown -R <your_user>:<your:user> directory-name`

Then, inside your team folder add a `repos` directory

* `cd teamXX`
* `sudo mkdir repos`
* `sudo chown -R <your_user>:<your:user> repos`

Now, all of your code repositories can be cloned into the directory by navigating into `/home/teamXX/repos` and using the command

* `git clone <git-url>`

It is strongly recommended that your entire team review Git if you are not familiar, as it is essential for this project and very easy to mess up. You can read the [official Git documentation](https://git-scm.com/docs) for more information.
