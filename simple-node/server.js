'use strict';

const express = require('express');
const AWS = require('aws-sdk');
const s3 = new AWS.S3()

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world v5\n');
});

app.get('/s3', (req, res) => {
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log(err, err.stack);
            res.json(err);
        } else {
            console.log(data);
            res.json(data);
        }
    });    
    
});

app.get('/kill', (req, res) => {
    process.exit(1);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);