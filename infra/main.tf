module "lambda_node" {
  source           = "./modules/lambda"
  function_name    = "api"
  code_path        = "handlers/node"
  LAMBDA_MOUNT_CWD = var.LAMBDA_MOUNT_CWD
}

module "api_gateway" {
  source = "./modules/apigateway"
  path = "webhook"
}
