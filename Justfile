# Lists all available recipes

default:
    just --list

# Spins up development containers

dev:
    docker compose up -d

undev:
    docker compose down

client:
    bun run --filter client dev

server:
    bun run --filter server dev

test_server:
    DATABASE_URL="mongodb://localhost:27018/mern-url-shortener" bun run --filter server dev

drop_database:
    DATABASE_URL="mongodb://localhost:27018/mern-url-shortener" bun run --filter server db:drop

e2e_test: drop_database
    cd ./server/tests/e2e/
    hurl -v ./server/tests/e2e/auth.hurl
    hurl -v ./server/tests/e2e/link.hurl
    hurl -v ./server/tests/e2e/user.hurl
