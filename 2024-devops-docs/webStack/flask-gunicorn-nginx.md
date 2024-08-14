# WebStack Setup
### We will be using three different technologies to create our webStack. 
### Flask, Gunicorn, and Nginx.

## What is Flask?
Flask is a micro web framework written in Python. It is classified as a microframework because it does not 
require particular tools or libraries.
However, Flask supports extensions that can add application features as if they were implemented in Flask itself.

## What is Gunicorn?
The Gunicorn "Green Unicorn" (pronounced jee-unicorn or gun-i-corn) is a Python Web Server Gateway Interface (WSGI) 
HTTP server. The Gunicorn server is broadly compatible with a number of web frameworks, simply implemented, light on server resources and fairly fast.
It is often paired with NGINX, as the two have complementary features.

## What is Nginx?
Nginx (pronounced "engine x", stylized as NGINX) is a web server that can also be used as a 
reverse proxy, load balancer, mail proxy and HTTP cache.

## Installation Tutorial
We will be following this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-22-04
) for the configuration of our webStack.
Make sure to follow the prerequisites. Your domain names have been already been configured.


## Databases
Now that we've got a functional webserver, we can set up our database of choice.

* [MySQL Setup](/devops/database/mysql-setup.md)