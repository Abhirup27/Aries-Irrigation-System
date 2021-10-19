const express = require('express');
const app = express();
var PORT=3000;

app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html');

});

app.listen(PORT,function(){
    console.log(`RPi Server started at port: ${PORT}`);

});