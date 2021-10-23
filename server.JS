const express = require('express');
const bodyParser = require('body-parser')
const fs =require('fs');
const app = express();
var PORT=3000;

    app.use(express.json())
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
app.post('/routine/ADD',function(req,res){
    express.json()
    //console.log(req.body);
    fs.appendFile(__dirname +'/data/jobSchedule.JSON',JSON.stringify(req.body), (err) => {
        if (err) {
          console.log(err);
        }
        else {
          // Get the file contents after the append operation
          res.send("received and stored");
        }
      });
    
})
app.get('/routine/routinePage.JS',function(req,res){
    res.sendFile(__dirname +"/scripts/client/routinePage.JS");
})
app.listen(PORT,function(){
    console.log(`RPi Server started at port: ${PORT}`);

});
app.get('/data/jobTypes.JSON', function(req,res){
    //console.log(req.url)
//console.log(JSONparse(__dirname + req.url))
    fs.readFile(__dirname + req.url, 'utf-8', (err, Rdata)=>
    {
        if(err){
            throw err;
        }

        //console.log(Object.values(JSON.parse(Rdata)))
        const data = Object.values(JSON.parse(Rdata))//JSON.parse(Rdata.toString());
        res.send(data);
    }
     )
    //res.sendFile(__dirname + '/data/jobTypes.JSON')

})
app.get('/data/jobSchedule.JSON', function(req,res){
    //console.log(req.url)
//console.log(JSONparse(__dirname + req.url))
    fs.readFile(__dirname + req.url, 'utf-8', (err, Rdata)=>
    {
        if(err){
            throw err;
        }

        //console.log(Object.values(JSON.parse(Rdata)))
        //const data = Object.values(JSON.parse(Rdata))//JSON.parse(Rdata.toString());
        res.send(Rdata);
    }
     )
    //res.sendFile(__dirname + '/data/jobTypes.JSON')

})
app.get('/date', function(req,res){
    let date = new Date();
        const data =date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
        res.send(data);  
            
    
     })
// app.get('/time', function(req,res){
//         const data =date.getHours()+':'+date.getMinutes();
//         res.format({  
//             'text/plain': function(){  
//               res.send(data);  
//             }
//     }
//      )})

app.get('/time', function(req,res){
    let date = new Date();
        const data =[date.getHours() , date.getMinutes() , date.getSeconds()];
    
              res.send(data);  
        

     })


// app.get('/hour', function(req,res){
//     let date = new Date();
//         const data =date.getHours();
//         res.send(String(data));  
//         })

//      app.get('/minute', function(req,res){
//         let date = new Date();
//         const data =date.getMinutes();
//          res.send(String(data));  
//         })

//      app.get('/second', function(req,res){
//         let date = new Date();
//         const data =date.getSeconds();
//         console.log(data);
//         res.send(String(data));  
  //   })
