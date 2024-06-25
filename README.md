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

### Security

We've added some security measures to make our app a safe one.

- Password encryption using bcrypt.
- Use of enviromental variables to avoid exposing passwords, api keys or database credentials.
- Use of Json Web Token to maintain user session and avoid vulnerabilities.
