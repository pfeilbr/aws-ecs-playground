# ecs-on-ec2-with-bottlerocket-example

example ECS on EC2 using Bottlerocket AMI for ECS container instance

## Demo

```sh

AMI_ID=$(aws ssm get-parameter --region us-east-1 --name "/aws/service/bottlerocket/aws-ecs-1/x86_64/latest/image_id" --query Parameter.Value --output text)

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

# run task
aws ecs run-task \
    --cluster "ecs-on-ec2-with-bottlerocket-example" \
    --task-definition ecs-on-ec2-with-bottlerocket-example-MyTaskDefinition-Ij0ai7S70vn0:1 \
    --launch-type "EC2" \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-4700526d],securityGroups=[sg-90433feb]}"

# view task output in CloudWatch logs
aws logs tail "ecs-on-ec2-with-bottlerocket-example-LogGroup-DCBCbsNhcIcF" --follow

# delete stack
sam delete --no-prompts
```

## Screenshots

![](https://www.evernote.com/l/AAHEKIStGH1CHJD3ciFlZnjgNEmexaGPtv8B/image.png)

![](https://www.evernote.com/l/AAH90PqTfDdKqIzMSMMvHDilg_vR-vjoPG4B/image.png)

## Resources

- [Using a Bottlerocket AMI with Amazon ECS (bottlerocket/QUICKSTART-ECS.md)](https://github.com/bottlerocket-os/bottlerocket/blob/develop/QUICKSTART-ECS.md)
- [Getting started with Bottlerocket and Amazon ECS](https://aws.amazon.com/blogs/containers/getting-started-with-bottlerocket-and-amazon-ecs/)
- [Using Bottlerocket with Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-bottlerocket.html)

