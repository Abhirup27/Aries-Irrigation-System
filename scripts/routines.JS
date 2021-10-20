//include packages if required


//---main program---//
class Job{
    constructor(type,time){
        this.type=type;
        this.time=time;
        this.done=false;
    }
     time()
    {
        return this.time;
    }

}
var jobs = []
jobs.push(new Job('water','20:30'))

class routine{
    constructor()
    {
        this.items =
        {     }
        this.headIndex = 0;
         this.tailIndex = 0;
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
    get length() {
      return this.tailIndex - this.headIndex;
    }

}
const routines = new routine();
routines.enqueue(jobs[0]);


  //convert time  forom 24 hour format to seconds before passing time
  function runTask(cb, time) 
  //cb is callback function which is the next task that has to be run time in seconds
  {
    setTimeout(cb,time*1000)

  }