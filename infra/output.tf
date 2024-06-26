locals {
  modules = {
    node: module.lambda_node
    gateway: module.api_gateway
  }
}

output "resources_output" {
  value = [for i in local.modules: i ]
}

