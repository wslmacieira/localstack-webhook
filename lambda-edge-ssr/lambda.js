const serverlessExpress = require('@codegenie/serverless-express')
const { server } = require("./dist/serverless/main");
exports.handler = serverlessExpress({ app: server })