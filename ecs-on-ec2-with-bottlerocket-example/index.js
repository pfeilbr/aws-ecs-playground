const axios = require('axios');
var AWS = require("aws-sdk");

(async () => {

    console.log('hello from ecs-on-ec2-with-bottlerocket-example\n\n')

    // access public internet
    const resp = await axios.get('https://postman-echo.com/get')
    console.log(`GET https://postman-echo.com/get \n\n ${JSON.stringify(resp.data, null,2)}`)

    // access aws api (ECR public endpoint)
    const ecr = new AWS.ECR({region: 'us-east-1'});
    const describeRepositoriesResponse = await ecr.describeRepositories().promise();
    console.log(`ecr.describeRepositories():\n\n${JSON.stringify(describeRepositoriesResponse.repositories, null,2)}`)
})()

