# Bookhorder

An booksearching app using Google Books API, with a GraphQL backend allowing users to save books they search for

Demo: <https://bookhoarder.herokuapp.com/>

## Contents

[Local Deployment](#local-deployment)

[Examples](#examples)

## Local Deployment

This Application uses [MongoDB](https://www.mongodb.com/) as it's database and
[Mongoose JS](https://mongoosejs.com/) as the Objection Document Model for providing schema models and queries.

Be sure to have MongoDB setup an running before you download.

You will also need to be farmillar with the [Apollo Server and Client](https://www.apollographql.com/)

### Download

In your terminal download the repo

```terminal
git clone https://github.com/minusInfinite/bookhoard.git
```

Once downloaded install the dependencies with NPM

```terminal
npm install
```

If you local MongoDB has Authentication setup it might be easier to confirm a Node Environment Parameter. You edit the .env.EXAMPLE file to .env with the following

> MONGODB_URI - \_The database connection URL string\*

You can find more details about MongoDB connection strings here - https://docs.mongodb.com/manual/reference/connection-string/

You will also may have a TOEKN_SECRET to generate JSON Web Tokens (JWT)

Once you .env is setup you should be able to run the server

```terminal
npm start
```

You can access GraphQL Playground from localhost:PORT/graphql

Or for development, this script will run both the server with Nodemon and the React Dev server.

```terminal
npm run develop
```

To build the React Client you can run the following script, this is set to client/build

```terminal
npm run build
```

## Example

[Live Demo](https://bookhoarder.herokuapp.com/)

![Animated Demo GIF](/md/bookhoarder-demo.png)
