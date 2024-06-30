module "lambda_node_hello" {
  source           = "./modules/lambda"
  function_name    = "hello"
  code_path        = "handlers/node"
  handler          = "index.handler"
  LAMBDA_MOUNT_CWD = var.LAMBDA_MOUNT_CWD
}

module "lambda_edge_ssr" {
  source           = "./modules/lambda"
  function_name    = "lambdassr"
  code_path        = "lambda-ssr"
  handler          = "lambda.handler"
  LAMBDA_MOUNT_CWD = var.LAMBDA_MOUNT_CWD
}

module "api_gateway" {
  source = "./modules/apigateway"
  # path   = "webhook"
}
