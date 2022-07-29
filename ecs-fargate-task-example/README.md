# ecs-fargate-task-example

example ECS Fargate nodejs task that is manually run

## Demo

```sh

# deploy task
# this creates the ECR repo needed below to push the container image to
# NOTE `MyTaskDefinition` output
sam deploy

account_id="$(aws sts get-caller-identity --query 'Account' --output text)"
region="us-east-1"
repository_name="${account_id}.dkr.ecr.${region}.amazonaws.com"
image_name="my-nodejs-task:latest"

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


# login to bastion host
dev01 start wait
dev01 sssh

# run task
aws ecs run-task \
    --cluster MyFargateTaskCluster \
    --task-definition ecs-fargate-task-example-MyTaskDefinition-f7oCUqciAA2V:1 \
    --launch-type "FARGATE" \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-058724041d8b0811a],securityGroups=[sg-90433feb]}"

# view task output in CloudWatch logs
aws logs tail "ecs-fargate-task-example-LogGroup-PC3x4F18qpuO"

# delete stack
sam delete --no-prompts
```

## Screenshots

ECR Repo

![](https://www.evernote.com/l/AAGhi6cu77ZLQpIhHHtSg8lnMkLozngxor8B/image.png)

Task Output in CloudWatch Logs

![](https://www.evernote.com/l/AAHbdsNP_itPPIApV3w8hbtJF1huT0KODe0B/image.png)

![](https://www.evernote.com/l/AAHrcJS1UNtPfZp2nn58cxFj3iWIk9IC4XUB/image.png)


## Resources

- 