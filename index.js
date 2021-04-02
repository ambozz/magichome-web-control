const express = require('express');
const { Control } = require('magic-home');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const utils = require('./utils')

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));  

let light = new Control("");

app.get('/', function (req, res, next) {
    if(!light._address){
        res.sendFile(path.join(__dirname + '/web/setaddress.html'));
        console.log(chalk.red(`IP Address not set yet. Sending setaddress.html form.`));
    }else{
        res.sendFile(path.join(__dirname + '/web/index.html'));
    }
})

app.post('/setaddress', function (req, res, next) {
    light._address = req.body.address;
    console.log(chalk.yellow(`IP Address was set to: ${light._address}`));
    res.redirect("/");
})


var nextColor = "#133769";
var oldColor = "#133769";

app.post('/setcolor', function (req, res, next) {
    nextColor = req.body.color;
    res.redirect("/");
})


var delay = false;

var t = setInterval(interval,500);

function interval(){
    delay = false;
    if(oldColor != nextColor){
        oldColor = nextColor;
        delay = true;

        let color = utils.hexToRGB(nextColor);
        newColor(color.r, color.g, color.b);

        console.log(chalk.green(`Color was set to: ${nextColor}`));
    }
}

async function newColor(red, green, blue){
    try{
        await light.setColor(red, green, blue);
    }catch{
        
    }
}

app.listen(80)