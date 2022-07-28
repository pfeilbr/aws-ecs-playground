# ecs-fargate-load-balanced-http-service-example

example ECS Fargate private (vpc only access) load balanced (internal ALB) http service (nginx)

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
