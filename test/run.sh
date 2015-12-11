NODE_ENV=test npm run migrate:latest
NODE_ENV=test npm run seed:run
PORT=4001 ./node_modules/.bin/mocha --recursive -r test/test-helper.js "$@"
