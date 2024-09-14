## Installation
1. Clone the repository: `git clone https://github.com/3whalesProg/Referral/`
2. `git checkout master`
3. Install the dependencies: `npm install`
4. Cd docker and do `docker-compose up` or create database with pgAdmin
5. make migrations with `npx knex migrate:latest --knexfile=./knexconfig.ts`
6. Make .env file by .envexample
7. Up docker container with redis `docker run --name redis -p 6379:6379 -d redis`
8. To run test `npm run test:dev`
9. Swagger url on `/api-docs`

## Usage

To start the service, run the following command:
```shell
npm run dev
```

## License
This project is licensed under the MIT License.
