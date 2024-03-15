# FieldSync Assignment

This reposiroty contains a React Application with the following integrated components:

- Front-end (React)
- API (node.js)
- Database (postgres)

## Installation

### Requirements:
Please ensure that the following libraries and frameworks are installed before running the program:
- Node.js. [installation instructions](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).
- PostgreSQL.  [Installation instructions](https://www.postgresql.org/download/). 
- Docker. [Installation Instructions](https://docs.docker.com/get-docker/).

### Running the App:

#### 1. API and database

To run the Docker containers for the API and PostgreSQL database, execute the following commands from the root folder:


```bash
$ cd api
$ docker compose up -d
```
Upon successful execution, two container instances will run in the background. Verify by using docker ps and docker images commands.

Alternatively, if you prefer running the backend without Docker, ensure PostgreSQL is running:
```bash
$ sudo -i -u postgres
$ sudo systemctl status postgresql
```
Furthermore, adjust the login credentials in "api/.env" to match your PostgreSQL configuration.

Then, run the API standalone using npm:

```bash
$ cd api
$ npm install
$ npm start
```
This will install all necessary dependencies and start the server.

#### 2. API and database

To run the React frontend using npm, execute these commands from the root folder:

```bash
$ cd frontend
$ npm install
$ npm run
```
This will open the single-page application at localhost:3000, accessible via any web browser.

Have fun! :)

2024 Daniel Valencia. All rights reserved.