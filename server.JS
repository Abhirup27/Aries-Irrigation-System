const express = require('express');
const app = express();
var PORT=3000;

//--REQUESTS FROM INDEX.HTML--//

app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html');

});
app.get('/index.JS', function(req,res){
    res.sendFile(__dirname + '/index.JS')

})
app.post('/routine',function(req,res){
    res.sendFile(__dirname +"/scripts/client/routine.html");
    
})

//---END---//

app.get('/routine/routinePage.JS',function(req,res){
    res.sendFile(__dirname +"/scripts/client/routinePage.JS");
})
app.listen(PORT,function(){
    console.log(`RPi Server started at port: ${PORT}`);

});
app.get('/data/jobTypes.JSON', function(req,res){
    res.sendFile(__dirname + '/data/jobTypes.JSON')

})
