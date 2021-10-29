//include packages if required
const fs = require('fs')

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
      this.smallestI=1;
      
      for(this.i=0; this.i<this.items.length; this.i++)
      {
        //console.log("running")
        if(this.items[this.i].time < this.items[this.smallestI].time)
        {
          
          this.smallestI= this.i;
        }
      }

      this.temp = this.items[0]
      this.items[0] = this.items[this.smallestI]
      this.items[this.smallestI]= this.temp;
      //const timeLeftNextTask= (this.items[0].time.slice(0,2) - currtime.slice(0,2))*60*60 +(this.items[0].time.slice(3,5) - currtime.slice(3,5))*60  -currtime.slice(6,8);
      
    }
    calcNextTaskTime(currtime){
      const timeLeftNextTask= (this.items[0].time.slice(0,2) - currtime.slice(0,2))*60*60 +(this.items[0].time.slice(3,5) - currtime.slice(3,5))*60  -currtime.slice(6,8);
      return timeLeftNextTask;
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }

}
const routines = new routine();
//routines.enqueue(jobs[0]);


  //convert time  forom 24 hour format to seconds before passing time
  function runTask(cb, time) 
  //cb is callback function which is the next task that has to be run time in seconds
  {
    setTimeout(cb,time*1000)

  }

  module.exports = {
    restartSchedule: function (date ,time) {
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
            //console.log(jobs[i])
          }
          for(i=0;i<jobs.length; i++)
          {
           // console.log(date)
            if(jobs[i].date == date)
            {
              //console.log(jobs[i]);
              
              routines.enqueue(jobs[i])
              
              //console.log(routines.items[1]);
              
            }
          }
          routines.sort()
          return routines.calcNextTaskTime(time);

          
    }
     )  
    },

    setDate: function(D){
      console.log(D);
    },
    getjobTypeTop: function()
    {
      return routines.peekJob();  
    }
  };