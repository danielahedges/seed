# seed
Seed project for a MEAN site

## Installation Instructions

After installing git, npm, bower, and mongo locally:

1. Install [Git](https://git-scm.com/downloads)
1. Install [Node](https://nodejs.org/en/download/)
1. Install [MongoDB](https://docs.mongodb.com/manual/installation/)
1. Run a local database instance from a terminal: `mongod`
1. Clone this repository, and cd into the directory.
1. `npm install`
1. `npm start`
1. Open a browser to the localhost port specified in stdout.

## Docker Deployment

If you have Docker installed, you can deploy locally to a container. The following
steps will run a container

1. Create a mongo account on some machine (try mlab.com). Take note of the connection
string.
2. Build the image: `docker image build -t seed-image .`
3. Run the built image:
`docker run -e MONGO_CONNECT_STRING="<connect_string>" -e SESSION_SECRET="<random_passphrase>" -e NODE_ENV="production" -p 3001:3001 seed-image`
4. Check your browser window at [http://localhost:3001](http://localhost:3001).
