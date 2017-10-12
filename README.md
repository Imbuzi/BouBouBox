# BouBouBox

BouBouBox is a french project, it's goal is to bring home automation to everyone, integrating low cost and high efficiency solutions to our box.

## Tech

BouBouBox uses a number of open source projects to work properly:

* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [npm](https://www.npmjs.com/) - node.js packet manager
* [Express](http://expressjs.com/) - fast node.js network app framework
* [socket.io](https://socket.io/) - real-time bidirectional event-based communication framework
* [vue.js](https://vuejs.org/) - progressive javascript view framework
* [vuex](https://vuex.vuejs.org) - vue.js application state plugin
* [vue-socket.io](https://github.com/MetinSeylan/Vue-Socket.io) - socket.io implementation for vue.js and vuex
* [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js

And of course BouBouBox itself is open source with a [public repository](https://github.com/Imbuzi/BouBouBox) on GitHub.

## Testing

You can test the BouBouBox project without the milight bridge. You just need to run the project in dev mode to see the commands sent to the bridge in the server NodeJS console.
To set up your project to run in dev mode, you'll need to run this commands on your BouBouBox project directory.

	## Setting up git repository
    git clone <git-url>
	cd BouBouBoux/
	git checkout tags/<version-name>
	git pull

	## Setting up node project
	npm install
	npm run build-dev
	nodemon

The Node JS server is now listening on port 3000. You can access it from your machine through http://localhost:3000.