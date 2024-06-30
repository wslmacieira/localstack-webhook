locals {
  modules = {
    helloFunc: module.lambda_node_hello
    lambdaEdge: module.lambda_edge_ssr
    gateway: module.api_gateway
  }
}

output "resources_output" {
  value = [for i in local.modules: i ]
}

