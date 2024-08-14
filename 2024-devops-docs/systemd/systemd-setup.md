# Systemd Setup
Systemd is a Linux process manager which essentially determines which unit services run when a system is started. Here is some [optional reading](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files) if you want to learn more about systemd.

For our purposes, we will primarily use it to run some Python programs as background processes that will allow us to listen and respond to HTTPS requests on specific ports.

## Creating a systemd User
The first step of systemd setup is creating a user exclusively for running our system services. This can be done with the following command, using any password (be sure to write it down) and skipping the other details.

* `sudo adduser systemduser`

Then of course it is important to give this systemduser ownership and read/execute permissions to any files we want them to run as services.  This can be done with the commands:

* `sudo chown systemduser:systemduser <filename>`
* `sudo chmod 500 <filename>`

## Creating a systemd Service
Next, we want to write a systemd .service file, which uses the systemduser to run our file in the background.  This file can be created by first navigating to the systemd directory and then creating a new file with the .service extension:

* `cd /etc/systemd/system`
* `sudo nano <nameOfService>.service`

Then inside this file, paste the template below and fill out the path to the code you want to run as a service, and the description of the service.  You can read [this documentation](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files) from Digital Ocean on system unit files for more information.
```ini
[Unit]
Description=A name that describes the functionality
After=syslog.target
 
[Service]
User=systemduser
ExecStart=/path/to/file/to/run
Restart=always
RestartSec=3
 
[Install]
WantedBy=multi-user.target
```
Important Note:  When running a Python file with a service, you will need to specify the interpreter in ExecStart as shown in the example below.  This is similar to how you have to type “`python3 file.py`” to run a Python file normally.

* `ExecStart=/usr/bin/python3 /path/to/file.py`

Finally, we can start our service and check to make sure it is running with the following commands:

* `sudo systemctl start <nameOfService>.service`
* `sudo systemctl enable <nameOfService>.service`
* `sudo systemctl status <nameOfService>.service`

The status message should say the service is active, and can be closed by pressing Q if it does not close automatically.

Additionally, if you wish to stop a service it can be done with the commands:

* `sudo systemctl disable <nameOfService>.service`
* `sudo systemctl stop <nameOfService>.service`

NOTE: only using the start and stop commands will start or stop the service until the next reboot.  The enable and disable commands will determine whether the service actually runs after a reboot.

This concludes the systemd configuration. It is important to remember the commands for starting, stopping, and checking the status of a service, as well as the path to your services (`/etc/systemd/system`) because you will be using these a lot in troubleshooting.