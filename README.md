# Ort Social Hub

A simple social network web server built in Node Js, using Express, Sequelize + MySql.  

The purpose of this project is to have a server that can be used with our React Native app.

## Colaborators

- Ernesto Dainesi
- Owen Donnenfeld

## Starting The App

### Starting app locally

After cloning this repository, you can run the app with:

```bash
npm i
npm run start
```

You will need to set up a correct .env file to run this, with the following structure:  
```
PORT=<number of the port that you want to use>
MYSQL_URL=<my sql connection string>
SECRET=<a secret password as a string to generate json web token>
ORIGIN=<a string with the connection from which our server will receive requests>
```

### Using deployed server

Our server is deployed at https://railway.app/ to use it you can directly use our endpoints with this public url: https://ortsocialhubserver-production.up.railway.app/  
Keep in mind, that this is the backend of our client app. It is much easier to run it with our client.

Using this, you can avoid having to start the server locally or managing a .env file since it wil be already setup at railway.

### Starting client

Read the readme at [OrtSocialHub](https://github.com/ErneDainesi/OrtSocialHub).

## Endpoints

Routes:
- user: the main route in charge of managing requests of user, such as login, register, profile, etc.
- posts: the route in charge of posting new posts and fetching a users home or profile feed.

Subroutes:
- `/user/register`: POST used for creating a new user.
- `/user/login`: POST used for loggin in with a client.
- `/user/logout`: POST used for closing session in server.
- `/user/profile/:id`: GET used for getting a users profile.
- `/user/profile`: PUT used for updating data of users profile
- `/user/follow`: POST registers in the database that a user is following another user
- `/user/unfollow`: POST deletes the entry in the database that register that a user follows another user
- `/user/followers/:userId`: GET gets the people that the current user is following

- `/posts`: POST used for saveing a new post
- `/posts/home/:userId`: GET used for getting the users home feed
- `/posts/profile/:userId`: GET used for getting the users profile feed

## Security

We've added some security measures to make our app a safe one.

- Password encryption using bcrypt.
- Use of enviromental variables to avoid exposing passwords, api keys or database credentials.
- Use of Json Web Token to maintain user session and avoid vulnerabilities.
- This server is deployed at https://railway.app/ this way, each time we do a request to our server, we do it via HTTPS. Making the comunication between server and client secure.
