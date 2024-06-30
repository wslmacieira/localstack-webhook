const serverlessExpress = require('@codegenie/serverless-express')
const { server } = require("./dist/my-app/serverless/main");

exports.handler = serverlessExpress({ app: server })