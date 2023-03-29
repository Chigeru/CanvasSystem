# Worktask app
SKO could use a way to more easily get an overview of what the apprentices are working with and whether they may sitting with problems that delay them.<br>
There are plans for this information to be displayed on screens outside the rooms, as well as giving instructors easy access to the program for administrative purposes.



## Server
Server consists of the following modules:
* Express
* Mongoose
* MongoDB

The server uses Mongoose in order to connect to MongoDB.\ 
It also controls most of the functionality for creating, updating and deletion of entities since MongoDB doesn't have too much administration functionality of its collections

### `npm run dev`
When run from the position of the server, the command will use nodemon to start the server in a development envioment.\
The server runs at localhost and api's runs from localhost/api (port is configurable in .env file)

## Client
The client uses React for frontend with SCSS for easier styling management.\

In order to communicate with the server, Axios is used for consistency and easy code accessability and visibility.
### `npm start`

position your navigation in the client and run the code above, it'll start up the client in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
