# Ort Social Hub

A simple social network built in Node Js, using Express, Sequelize + MySql.

### Colaborators

- Ernesto Dainesi
- Owen Donnenfeld

### Starting app

After cloning this repository, you can run the app with:

```bash
npm i
npm run start
```

Then, you will need to start our client, [clone this other repository](https://github.com/ErneDainesi/OrtSocialHub).
And follow its instructions.

### Endpoints

Routes:
- user: the main route in charge of managing requests of user, such as login, register, profile, etc.
- posts: the route in charge of posting new posts and fetching a users home or profile feed.

Subroutes:
- `/user/register`: POST used for creating a new user.
- `/user/login`: POST used for loggin in with a client.
- `/user/logout`: POST used for closing session in server.
- `/user/profile/:id`: GET used for getting a users profile.
- `/user/profile`: PUT used for updating data of users profile

- `/posts`: POST used for saveing a new post
- `/posts/home/:userId`: GET used for getting the users home feed
- `/posts/profile/:userId`: GET used for getting the users profile feed

### Security

We've added some security measures to make our app a safe one.

- Password encryption using bcrypt.
- Use of enviromental variables to avoid exposing passwords, api keys or database credentials.
- Use of Json Web Token to maintain user session and avoid vulnerabilities.
