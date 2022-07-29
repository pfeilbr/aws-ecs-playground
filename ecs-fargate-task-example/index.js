const axios = require('axios');

(async () => {

    console.log('hello from ecs-fargate-task-example\n\n')

    // access public internet
    const resp = await axios.get('https://postman-echo.com/get')
    console.log(`GET https://postman-echo.com/get \n\n ${JSON.stringify(resp.data, null,2)}`)
  
})()

