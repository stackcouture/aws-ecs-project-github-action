provider "aws" {
  region = "ap-south-1"
}

terraform {
  backend "s3" {
    bucket  = "ecs-terraform-bucker0005" # create s3 bucket to store statefile
    key     = "dev/terraform.tfstate"
    region  = "ap-south-1"
    encrypt = false
  }
}

module "vpc" {
  source              = "./modules/vpc_module"
  vpc_cidr            = "10.0.0.0/16"
  public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
  azs                 = ["ap-south-1a", "ap-south-1b"]
  tags                = { Environment = "dev" }
}

module "alb" {
  source             = "./modules/alb_module"
  alb_name           = "ecs-alb"
  security_group_ids = [module.vpc.alb_sg_id]
  subnet_ids         = module.vpc.public_subnet_ids
  tags               = { Environment = "dev" }
  target_group_name  = "ecs-tg"
  target_group_port  = 80
  vpc_id             = module.vpc.vpc_id
}

module "ecs" {
  source             = "./modules/ecs_module"
  cluster_name       = "my-ecs-cluster"
  tags               = { Environment = "dev" }
  task_family        = "my-task-family"
  cpu                = "256"
  memory             = "512"
  container_name     = "my-app"
  container_image    = var.container_image
  container_port     = 80
  service_name       = "my-ecs-service"
  desired_count      = 1
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.vpc.alb_sg_id]
  target_group_arn   = module.alb.target_group_arn
  alb_listener_arn   = module.alb.listener_arn

}
