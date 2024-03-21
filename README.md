# Database Systems Project
Final Project Repo for Database Systems (CS 4750 UVA)


# Setup Guide:

## Download Docker Desktop:

- Download: <https://www.docker.com/products/docker-desktop/>

## Run these commands in src/

- `docker-compose build --no-cache`
- `docker-compose up`

## Check containers are running:

- Frontend: Navigate to <http://localhost:8080/>
- Backend: Navigate to <http://localhost:3000/>
- Database: Navigate to <http://localhost:3000/testDB>

## You're up and running!

- For each of the above URL's you should have been shown a message indicating success, you can check logs for errors either in the terminal you executed `docker-compose` in or on `Docker Desktop` in the logs for a given container.
- Message me on discord if something breaks, this stuff is convenient but can also be equivalently buggy and obnoxious.
