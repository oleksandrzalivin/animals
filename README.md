# Animals
Editable catalog of animals

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Clone this repository on your machine.

At first you need to install MongoDB locally. You can visit [this page](http://www.docs.mongodb.com/manual/installation/).
When it's done, make sure your path in second line 'scripts/start_mongo.js' is correct.

```
path = 'somePath/mongod.exe --dbpath "pathToThisRepo/animals/mongo_db"';

```

In cmd go to root path of this repo.
Then run the following command.

```
$ npm install

```
It will install all modules listed as dependencies in package.json.
In one cmd console run database.

```
$ npm run db

```
Then in another cmd console run the app.

```
$ npm start

```
Go to localhost:3000/.

## Built With

* [Express](https://expressjs.com/)
* [MongoDB](https://docs.mongodb.com/)
* [Backbone](http://backbonejs.org/#)
* [Requirejs](http://requirejs.org/)