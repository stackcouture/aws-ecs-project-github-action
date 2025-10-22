output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "ecs_cluster_id" {
  value = module.ecs.ecs_cluster_id
}

output "ecs_service_name" {
  value = module.ecs.ecs_service_name
}

output "ecs_task_definition_arn" {
  value = module.ecs.ecs_task_definition_arn
}

output "alb_dns_name" {
  value = module.alb.alb_dns_name
}