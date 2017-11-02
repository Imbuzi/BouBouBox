# BouBouBox

[![Travis](https://img.shields.io/travis/Imbuzi/BouBouBox.svg)]() [![GitHub tag](https://img.shields.io/github/tag/Imbuzi/BouBouBox.svg)]() [![GitHub last commit](https://img.shields.io/github/last-commit/Imbuzi/BouBouBox.svg)]() [![License CC BY-NC-SA 4.0](https://img.shields.io/badge/license-cc%20by--nc--sa%204.0-blue.svg)]()

BouBouBox is a french project, it's goal is to bring home automation to everyone, integrating low cost and high efficiency solutions to our box.

## Tech

BouBouBox uses a number of open source projects to work properly:

* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [npm](https://www.npmjs.com/) - node.js packet manager
* [Express](http://expressjs.com/) - fast node.js network app framework
* [socket.io](https://socket.io/) - real-time bidirectional event-based communication framework
* [vue.js](https://vuejs.org/) - progressive javascript view framework
* [vuex](https://vuex.vuejs.org) - vue.js application state plugin
* [vue-router](https://router.vuejs.org/) - vue.js routing plugin
* [jsonwebtoken](https://jwt.io/) - authentication token manager
* [knex.js](http://knexjs.org/) - lightweight and powerful db-orm

And of course BouBouBox itself is open source with a [public repository](https://github.com/Imbuzi/BouBouBox) on GitHub.

## Testing

You can test the BouBouBox project without the milight bridge. You just need to run the project in dev mode to see the commands sent to the bridge in the server NodeJS console (commands are loggde in user friendly format).
This project requires a MySQL database **only if running in staging or production mode**.
If you don't own a milight bridge, and just want to test the project in dev mode, you don't need any MySQL server : the project runs on a sqlite3 db.
All db configuration is located in [`knexfile.js`](https://github.com/Imbuzi/BouBouBox/blob/v0.2.0/knexfile.js.example).

### Commands used to start BouBouBox demo

To set up your project to run in dev mode, you'll need to run this commands on your BouBouBox project directory.

	## Setting up git repository
    git clone <git-url>
	cd BouBouBoux/
	git checkout tags/<version-name>

	## Launching demo
	npm run demo

The Node JS server is now listening on port 3000. You can access it from your machine through http://localhost:3000.
The default user credentials are `admin@boubou.io`, with password `Admin123!`.

**WARNING** : *All changes made to the database are deleted if you run `npm run demo` again. Please use `npm run nodemon-dev` if you want to restart the server without flushing database.*

### Demo scenario

First, connect to `http://localhost:3000`. You'll be redirected to a login form. Use the default credentials to connect with a validate account. You can also create an accout, and then validate it with a connected user.
When you're connected, you can control every widget (by default, only two milight widgets), and open right sidebar to validate users waiting for validation.

You can also test real-time sync if you open two windows with the app running. If you set a light power/intensity on a window, you'll see it change on the other window.