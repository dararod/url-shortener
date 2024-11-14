# Lists all available recipes

default:
    just --list
 
# Spins up development containers

dev:
    docker compose up -d

dev_server:
    cd ./server && bun run dev

dev_test_server:
    cd ./server && DATABASE_URL="mongodb://localhost:27018/mern-url-shortener" bun run dev

drop_database:
    cd ./server && DATABASE_URL="mongodb://localhost:27018/mern-url-shortener" bun run db:drop

e2e_test: drop_database
    cd ./server/tests/e2e/
    hurl -v ./server/tests/e2e/auth.hurl
    hurl -v ./server/tests/e2e/link.hurl
    hurl -v ./server/tests/e2e/user.hurl