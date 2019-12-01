## FullStack Typescript App(not sure what to name this)

#### Tech Stack

- Express
- Docker
- React(tsx)
- TypeScript
- Redux
- Redux Saga
- Sequelize

#### Functionalies

- Sign Up
- Sign Up Validations
- Log in
- Log Out
- Like A Post
- Unlike A Post

#### Docker notes on postgres(so i wont everr have to go through the pain of setting this up again lol)

Once `docker-compose up` is running do
`docker ps` from here you should see container ids
find the container id for the postgres database or service name in my case its called "database" that container id will be used for the following instructions

#### Docker Stuff

- `docker exec -it Container id here bash`
- `psql -U postgres`
- `postgres-# CREATE DATABASE mytest` assign this database you created to the environment on docker-compose.yml
- `postgres-# \q`
