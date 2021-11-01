//include packages if required
const fs = require('fs')
//var execute = require('../scripts/rpi-tasks.JS')
var spawn = require("child_process").spawn; 
path = require('path')

//---main program---//
class Job{
    constructor(type, occur,time,date){
        this.jobType=type;
        this.occur= occur;
        this.time=time;
        this.date=date;
        this.done=-1;
    }
     gettime()
    {
        return this.time;
    }
    status()
    {
      switch(this.done)
      {
        case -1:
          return "false"
          break;
        case 0:
          return "running"
          break;
        case 1:
          return "done"
          break;
        default:
          return "error"
          break;
      }
}
}
var jobs = []
var done=0;
var completed=0;
class routine{
    constructor()
    {
        this.items =
        []
        this.headIndex = 0;
         this.tailIndex = 0;
         this.i=0;
         this.smallestI;
         this.temp ={}
    }
     enqueue(Job) {
      this.items[this.tailIndex] = Job;
      this.tailIndex++;
    }
    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }
    peek() {
      return this.items[this.headIndex];
    }
    peekJob()
    {
      return this.items[this.headIndex].jobType;
    }
    sort() {
      this.smallestI=this.headIndex + 1;
      
      for(this.i=this.headIndex; this.i<this.items.length; this.i++)
      {
        //console.log("running")
        if(this.items[this.i].time < this.items[this.smallestI].time)
        {
          
          this.smallestI= this.i;
        }
      }

      this.temp = this.items[this.headIndex]
      this.items[this.headIndex] = this.items[this.smallestI]
      this.items[this.smallestI]= this.temp;
      //const timeLeftNextTask= (this.items[0].time.slice(0,2) - currtime.slice(0,2))*60*60 +(this.items[0].time.slice(3,5) - currtime.slice(3,5))*60  -currtime.slice(6,8);
      
    }
    calcNextTaskTime(currtime){
//       console.log(currtime.slice(0,2))
//          console.log(currtime.slice(3,5))
//  console.log(currtime.slice(6,8))
console.log(this.items[this.headIndex].time)
      const timeLeftNextTask= (this.items[this.headIndex].time.slice(0,2) - currtime.slice(0,2))*60*60 +(this.items[this.headIndex].time.slice(3,5) - currtime.slice(3,5))*60   -currtime.slice(6,8);

      return timeLeftNextTask;
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }

}
var routines = new routine();
//routines.enqueue(jobs[0]);


  //convert time  forom 24 hour format to seconds before passing time
  function runTask(cb, time) 
  //cb is callback function which is the next task that has to be run time in seconds
  {
    setTimeout(cb,time*1000)

  }

  module.exports = {
    restartSchedule: function (date) {
	
	
       console.log("start of restart sche")
      	routines = new routine();
	jobs=[]
      fs.readFile("./data/jobSchedule.JSON", 'utf-8', (err, Rdata)=>
    {
        if(err){
            throw err;
        }

        //console.log(Object.values(JSON.parse(Rdata)))
        const data = JSON.parse(Rdata)//JSON.parse(Rdata.toString());
        //console.log(data)
        var i;
        for(i=0; i<data.length; i++)
          {
            jobs.push(new Job(data[i].jobType, data[i].occur,data[i].time,data[i].date))
           console.log(jobs[i])
          }
          for(i=0;i<jobs.length; i++)
          {
           console.log(date)
            if(jobs[i].date == date)
            {
              //console.log(jobs[i]);
		console.log('inside if or restart Sche')              
              routines.enqueue(jobs[i])
              
              //console.log(routines.items[1]);
              
            }
          }
	  runTasks();
                   
   		
	 }
     )  
    },

    setDate: function(D){
      console.log(D);
    },
    getjobTypeTop: function()
    {
      return routines.peek();  
    } // ,
  // calcTimeLeft: function(time)
//	{
//	timeLeft =routines.calcNextTaskTime(time);
//	return timeLeft;
//	}
  };

function runTasks(){

          if(routines.length >1){
	console.log('before sorting')            
          routines.sort()
          }
	var process
         const timeLeft=  routines.calcNextTaskTime(getTime());
		console.log(timeLeft)
	if(timeLeft <0)
		{
		jobs[completed].done = 0;
		//done=  execute.execTask(routines.items[routines.headIndex].jobType);
	       process = spawn('python',["./scripts/GPIOtasks.pyw"] );
			process.stdout.on('data', function (data) {
  			console.log("result:" + JSON.parse(data.toString()).result);    
			if(JSON.parse(data.toString()).result == 1)
			{
				console.log('printed')
				jobs[completed].done =1;
				completed++;
				routines.dequeue();
				if(routines.length!=0)
				{
          
          runTasks();
				}
        else{
          updateDateJSON();
        }
			}
			});	
		}
		else{
			//setTimeout(function(){done=  execute.execTask(routines.items[routines.headIndex].jobType)},timeLeft*1000)		
			setTimeout(function(){ process = spawn('python',["scripts/GPIOtasks.pyw"] ); 
			process.stdout.on('data', function (data) {
 			 console.log(" " + JSON.parse(data.toString()).x);    
			 if(JSON.parse(data.toString()).result == 1)
                                {
                                jobs[completed].done =1;
                                console.log('printed')
				completed++;
				routines.dequeue();
				if(routines.length!=0)
                                {
                                runTasks();
                                }
                                else{
                                  updateDateJSON();
                                }
			
				}
			});
			},timeLeft*1000)
		

			}

	

}

function updateDateJSON()
{
  
  var index=0;
  while(index<jobs.length){
    if( jobs[index].occur == "Daily" )
    {
	var date = new Date(jobs[index].date)
	var nextDay = new Date(date);
	nextDay.setDate(date.getDate() + 1);

      //var date=  new Date( jobs[index].date)
      var Year=  nextDay.getFullYear();
	var Month = nextDay.getMonth() +1 ;

	var dt = nextDay.getDay()

	if(String(Month).length==1)
     	 { Month = '0'+Month; }
     	 if(String(dt).length==1){
      	dt='0'+dt;
     	 }

      jobs[index].date = Year+'-'+Month+'-'+dt

    // console.log(nextDay.getDate())
	 console.log(jobs[index].date)
    }
    index++;
  }
fs.writeFile(path.join(__dirname ,'..' , 'data', 'jobSchedule.JSON'),JSON.stringify(jobs), (err) => {
        if (err) {
          console.log(err);
        }
	restartSchedule(getDate())
});

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


function getDate(plusD=0, plusM=0, plusY=0){
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
