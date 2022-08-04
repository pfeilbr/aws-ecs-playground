# ecs-fargate-task-with-efs-example

- example ECS Fargate nodejs task with EFS file share that is manually run
- based on [aws-samples/drupal-on-ecs-fargate](https://github.com/aws-samples/drupal-on-ecs-fargate)

## Demo

```sh

# deploy task
# this creates the ECR repo needed below to push the container image to
# NOTE `MyTaskDefinition` output
sam deploy

account_id="$(aws sts get-caller-identity --query 'Account' --output text)"
region="us-east-1"
repository_name="${account_id}.dkr.ecr.${region}.amazonaws.com"
image_name="my-nodejs-task-with-efs:latest"

# build image
docker build -t "${image_name}" .

# run image locally
# todo: ecr.describeRepositories() fails because no aws creds in container
docker run -t -i $image_name

# push image to ecr
image_tag="${repository_name}/${image_name}"
aws ecr get-login-password --region "${region}" | docker login --username AWS --password-stdin "${repository_name}"
docker tag "${image_name}" "${image_tag}"
docker push "${image_tag}"

# run task
aws ecs run-task \
    --cluster MyFargateTaskWithEfsCluster \
    --task-definition ecs-fargate-task-with-efs-example-MyTaskDefinition-0WQrTLucunqG:1 \
    --launch-type "FARGATE" \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-058724041d8b0811a],securityGroups=[sg-90433feb]}"

# view task output in CloudWatch logs
aws logs tail "ecs-fargate-task-with-efs-example-LogGroup-BqK3BcngP2TK" --follow

# delete stack
sam delete --no-prompts
```

## Screenshots

ECR Repo

![](https://www.evernote.com/l/AAFaExgnWCFO3IGIP8geL2k2F1DYzFsKTugB/image.png)

Task Output in CloudWatch Logs

![](https://www.evernote.com/l/AAFa6qRxOTREm5tAgUb5Y1SyYXhMHZLN28wB/image.png)


## Resources

- [aws-samples/drupal-on-ecs-fargate](https://github.com/aws-samples/drupal-on-ecs-fargate)