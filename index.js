const express = require('express');
const { Control } = require('magic-home');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



let light = new Control("");
console.log(light._address);

app.get('/', function (req, res, next) {
    if(!light._address){
        res.sendFile(path.join(__dirname + '/setaddress.html'));
        console.log(chalk.red(`IP Address not set yet. Sending setaddress.html form.`));
    }else{
        res.sendFile(path.join(__dirname + '/index.html'));
    }
})

app.post('/setaddress', function (req, res, next) {
    light._address = req.body.address;
    console.log(chalk.green(`IP Address was set to: ${light._address}`));
    res.redirect("/");
})
 
app.listen(80)