const axios = require('axios');
const AWS = require("aws-sdk");
const fs = require("fs");

const mountPath = `/mnt`;

(async () => {

    console.log(`hello from aws-ecs-playground/ecs-fargate-task-with-efs-example\n\n`);

    // create file on efs filesystem
    fs.writeFileSync(`${mountPath}/${(new Date()).getTime()}.txt`, `${JSON.stringify(process.env, null, 2)}`);
    const contents = fs.readdirSync(mountPath);
    console.log(`contents: \n\n${contents}`)

})()

