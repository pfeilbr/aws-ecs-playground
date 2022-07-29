# aws-ecs-playground

learn [AWS ECS](https://aws.amazon.com/documentation/ecs/)

## Examples

### [`ecs-fargate-load-balanced-http-service-example`](ecs-fargate-load-balanced-http-service-example/)

example ECS Fargate private (vpc only access) load balanced (internal ALB) http service (nginx)

### [`ecs-cli-example`](ecs-cli-example/)

example using `ecs-cli` to serve simple docker compose nodejs web app

## Notes

- [`AWS::ECS::TaskDefinition.ExecutionRoleArn`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-executionrolearn) - role that grants the Amazon ECS container agent permission to make AWS API calls on your behalf.  For example, permission to pull ECR images and create log streams.  See [Amazon ECS task execution IAM role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html).  The `arn:aws:iam::${AWS::AccountId}:role/ecsTaskExecutionRole` role is available by default.
- [`AWS::ECS::TaskDefinition.TaskRoleArn`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-taskrolearn) - role that grants containers in the task permission to call AWS APIs on your behalf.  e.g. access S3, secrets manager, etc.  See [IAM roles for tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [`AWS::ECS::Service.NetworkConfiguration`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html#cfn-ecs-service-networkconfiguration) - required for task definitions that use the awsvpc network mode to receive their own elastic network interface, and it is not supported for other network modes
- [`AWS::ECS::Service.NetworkConfiguration.AwsvpcConfiguration.AssignPublicIp`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-service-awsvpcconfiguration.html#cfn-ecs-service-awsvpcconfiguration-assignpublicip) - Whether the task's elastic network interface receives a public IP address. The default value is DISABLED. (DISABLED | ENABLED)