const express = require('express');
const bodyParser = require('body-parser')
const fs =require('fs');
const app = express();
var tool =  require('./scripts/routines.JS');
//var taskRunner = require('./scripts/rpi-tasks.JS');
const { getTop } = require('./scripts/routines.JS');
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
    fs.writeFile(__dirname +'/data/jobSchedule.JSON',JSON.stringify(req.body), (err) => {
        if (err) {
          console.log(err);
        }
        else {
          // Get the file contents after the append operation
          res.send("received and stored");
          var date = new Date()
          //const currDate =String(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
          
	const currDate = getDate();
	const currTime = getTime();
         // tool.setDate(currDate)
		console.log("before restarting schedule")
          tool.restartSchedule(currDate)
         //const timeLeft= tool.calcTimeLeft(currTime)
	// const taskType = tool.getjobTypeTop();
          //if(timeLeft <=0)
         // {
       //        taskRunner.execTask(taskType); //Call functions of rpi-tasks
          //}
         // else{
	//	console.log(timeLeft)
         //  setTimeout(function(){taskRunner.execTask(taskType);}, timeLeft);
         // }
        }
      });
    
})
app.post('/routine/DELETE', function(req,res){
    express.json()
    
    fs.writeFile(__dirname +'/data/jobSchedule.JSON',JSON.stringify(req.body), (err) => {
        if (err) {
          console.log(err);
        }
        else {
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
	
        //var data =date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
        
	var Month = date.getMonth()+1;
	var Year = date.getFullYear()
	var dt = date.getDate()
	if(String(Month).length==1)
	{ Month = '0'+Month; }
	if(String(dt).length==1){
	dt='0'+dt;
	}
	const data = Year+'-'+Month+'-'+dt;
	res.send(data);  
            
    
     })

function getDate(){
    let date = new Date();

        //var data =date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        var Month = date.getMonth()+1;
        var Year = date.getFullYear()
        var dt = date.getDate()
        if(String(Month).length==1)
        { Month = '0'+Month; }
        if(String(dt).length==1){
        dt='0'+dt;
        }
        const data = Year+'-'+Month+'-'+dt;
        return data;


     }

function getTime(){
	let time = new Date()

	var hour = time.getHours();
	if(String(hour).length==1)
	{
	hour = '0' + hour
	}
	var minute =time.getMinutes();
	if(String(minute).length==1)
	{
	minute = '0' + minute;
	}
	var second = time.getSeconds();
	if(String(second).length==1)
	{
	second = '0' + second;
	}
	const data2 = hour+':'+minute+':'+second
	return data2;
}




// app.get('/time', function(req,res){
//         const data =date.getHours()+':'+date.getMinutes();
//         res.format({  
//             'text/plain': function(){  
//               res.send(data);  
//             }
//     }
//      )})

app.get('/time', function(req,res){
   // let date = new Date();
        const data =getTime();
    
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
