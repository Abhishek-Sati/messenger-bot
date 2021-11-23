# messenger-bot

Package Requirements:
1. Postgres
2. Redis
3. Node
4. npm / yarn

Application setup: 

1. Open postgres either by terminal or by pgAdmin4, create a database(create database messenger).
2. create a relation inside newly created database (create table message (message_id VARCHAR PRIMARY KEY, message TEXT, is_bot BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT NOW()))
3. create an .env file which will be storing all the important key value pairs that we don't want to expose, for this project we need to add following values into our .env file:
   
   PORT=5000
   PGHOST=localhost
   PGDATABASE=messenger
   PGUSER=******
   PGPASSWORD=*****
   NODE_ENV=development
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379

5. Now start the redis server by running redis-server.
6. Now come to the directory where you have saved the repository locally and run:
   1. yarn or npm i (for installing dependencies).
   2. yarn dev or npm run dev (to run app in development mode).
   3. Run yarn build for creating a production build of the code.
