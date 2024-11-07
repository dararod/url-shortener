# Lists all available recipes

default:
    just --list
 
# Spins up development containers

dev:
    docker compose up -d

dev_server:
    cd ./server

drop_database:
    cd ./server && DATABASE_URL="mongodb://localhost:27018/mern-url-shortener" bun run db:drop

e2e_test: drop_database
    hurl -v ./test/server/auth.hurl
    hurl -v ./test/server/link.hurl
    hurl -v ./test/server/user.hurl