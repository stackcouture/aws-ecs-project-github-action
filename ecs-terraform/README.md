# Terraform AWS ECS Fargate with ALB Modular Setup

This repository provides a modular Terraform configuration to deploy an AWS ECS Fargate cluster with an Application Load Balancer (ALB), VPC, subnets, and all required networking components.

## Module Structure

- **modules/vpc_module**: Creates VPC, public subnets, Internet Gateway, route table, and a security group for ALB.
- **modules/alb_module**: Provisions an Application Load Balancer, target group, and listener.
- **modules/ecs_module**: Deploys ECS cluster, IAM role, task definition, and ECS service (Fargate) integrated with the ALB.

## Features
- VPC with configurable CIDR block
- Public subnets across multiple Availability Zones
- Internet Gateway and route table for public internet access
- Security group allowing HTTP (port 80) access
- Application Load Balancer (ALB) for traffic distribution
- ECS Cluster (Fargate launch type)
- IAM Role for ECS task execution
- ECS Task Definition with configurable Docker image
- ECS Service with ALB integration

## Usage

1. **Clone the repository**

```sh
git clone <this-repo-url>
cd terraform-copilot
```

2. **Configure your AWS credentials** (via environment variables, AWS CLI, or shared credentials file).

3. **Edit `main.tf`**
   - Adjust VPC CIDR, subnet CIDRs, AZs, ECS parameters, and Docker image as needed.
   - The backend is configured for S3; update the bucket/key/region if required.

4. **Initialize Terraform**

```sh
terraform init
```

5. **Plan the deployment**

```sh
terraform plan
```

6. **Apply the configuration**

```sh
terraform apply
```

7. **Outputs**
   - VPC ID, subnet IDs, ECS cluster/service/task ARNs, and ALB DNS name will be displayed after apply.

## Module Inputs & Outputs

### VPC Module (`modules/vpc_module`)
- **Inputs:**
  - `vpc_cidr`: CIDR block for the VPC
  - `public_subnet_cidrs`: List of public subnet CIDRs
  - `azs`: List of availability zones
  - `tags`: (optional) Map of tags
- **Outputs:**
  - `vpc_id`, `public_subnet_ids`, `alb_sg_id`

### ALB Module (`modules/alb_module`)
- **Inputs:**
  - `security_group_ids`, `subnet_ids`, `tags`, `target_group_port`, `vpc_id`
- **Outputs:**
  - `alb_arn`, `alb_dns_name`, `target_group_arn`, `listener_arn`

### ECS Module (`modules/ecs_module`)
- **Inputs:**
  - ECS cluster/service/task parameters, subnet IDs, security group IDs, ALB target group/listener ARNs
- **Outputs:**
  - `ecs_cluster_id`, `ecs_service_name`, `ecs_task_definition_arn`

## Notes
- Ensure your AWS account has sufficient permissions to create all resources.
- The ALB and ECS service are set up for HTTP (port 80) only by default.
- The ECS service uses the Fargate launch type and a sample NGINX image. Update the image as needed.

## Cleanup
To destroy all resources:

```sh
terraform destroy
```

---

Feel free to customize the modules and root configuration for your needs.
