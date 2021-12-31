## FullStack Typescript App(not sure what to name this)

### Front End Layer

Would need this

https://github.com/EliHood/fullstackbackend

### Instructions

- `yarn run build:watch` 1st window
- `yarn start` 2nd window

#### Tech Stack

- Docker
- React(tsx) (some React Hooks)
- TypeScript
- Redux
- Redux Saga
- Sequelize
- Pusher

#### Functionalies

- Sign Up
- Repost
- Search Posts
- Sign Up Validations
- Mention Users
- Log in
- Google Oauth login
- Log Out
- Comment Replies
- Like A Post
- Unlike A Post
- Add Comment to a Post
- Email Confirmation
- Edit Profile
- Comment Notifications
- Follower User/Unfollow User

#### For executing Docker(have your env variables set up)

- `docker exec -it database psql -U postgres -c "CREATE DATABASE elitypescript"`

- `docker-compose up --build --force-recreate`

### login

`username: Caesar`
`password: fish123`

#### Docker notes on postgres(so i wont everr have to go through the pain of setting this up again lol)

Once `docker-compose up` is running do
`docker ps` from here you should see container ids.
Find the container id for the postgres database or service name in my case its called "database". That container id will be used for the following instructions

some helpful notes

`docker logs` container id

#### Docker Stuff
