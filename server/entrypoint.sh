# chmod +x entrypoint.sh
# docker exec -it  fullstacktypescript_database_1 psql -U postgres -c "CREATE DATABASE elitypescript"
npm run undoseed # my attempt to run seed first before server kicks in. but doesnt work
npm run server

