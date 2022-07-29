# ecs-fargate-load-balanced-http-service-example

example ECS Fargate private (vpc only access) load balanced (internal ALB) http service (nginx)

> the ecs tasks run in a priavte subnet(s) that have a public NAT gateway.  this is needed for the ecs agent to pull the container image from public internet

see [`template.yaml`](template.yaml)

## Demo

```sh
# deploy
# NOTE: `HTTPEndpoint` output
sam deploy

# login to bastion host
dev01 start wait
dev01 sssh

# curl endpoint
curl http://internal-FargateAlb-574598142.us-east-1.elb.amazonaws.com

# delete stack
sam delete --no-prompts
```

![](https://www.evernote.com/l/AAE72tYSm_dIvKYlT4Hcd9dNcAwtdK5R-EkB/image.png)

## Resources

- [mydeveloperplanet/MyAWSPlanet](https://github.com/mydeveloperplanet/MyAWSPlanet) - CloudFormation based on this
- [nathanpeck/aws-cloudformation-fargate](https://github.com/nathanpeck/aws-cloudformation-fargate)
- <https://mydeveloperplanet.com/2021/09/07/how-to-deploy-a-spring-boot-app-on-aws-ecs-cluster/>
- [How can I run an Amazon ECS task on Fargate in a private subnet?](https://aws.amazon.com/premiumsupport/knowledge-center/ecs-fargate-tasks-private-subnet/)
