# aws-ecs-playground

learn [AWS ECS](https://aws.amazon.com/documentation/ecs/)

### Session Steps

```sh
# configure ecs-cli
ecs-cli configure profile --profile-name ecs-cluster-01 --access-key <YOUR KEY> --secret-key <YOUR SECRET>
ecs-cli configure --cluster cluster01 --region us-east-1 --config-name cluster01

# create 1 node cluster
ecs-cli up --keypair brianpfeil --capability-iam --size 1 --instance-type t2.micro

# create node app
cd simple-node
docker build -t pfeilbr/simple-node .
docker push pfeilbr/simple-node

# NOTE: pfeilbr/simple-node docker image is referenced by docker-compose.yml

ecs-cli compose up
ecs-cli ps # shows ip and port.  see https://www.evernote.com/l/AAET15kkH-dNhoxA67iDXzzSmR6DBjWtC00B/image.png
open http://34.237.144.74 # see https://www.evernote.com/l/AAE7iN32poNDwJTGe6T8QYX875Rz4jbJwHYB/image.png
ecs-cli compose down

# make changes to server.js

# rebuild image
docker build -t pfeilbr/simple-node .

# test locally
docker run -p 49160:8080 -d pfeilbr/simple-node

# open locally
open http://localhost:49160

# push
docker push pfeilbr/simple-node

# make changes to docker-compose.yml if neccessary
ecs-cli compose up

# scale cluster to 2 nodes
ecs-cli scale --capability-iam --size 2

# scale simple-node across 2 nodes
ecs-cli compose scale 2


```

### Resources

* [Installing the Amazon ECS CLI](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html)
* [Configuring the Amazon ECS CLI](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_Configuration.html)
* [Amazon ECS CLI Tutorial](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_tutorial.html)
