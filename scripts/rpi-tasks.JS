var gpio = require('rpi-gpio');
//var gpioI = require('rpi-gpio');

var count=0;
process.on('unhandledRejection', (reason, promise) => {
  // do something
});
module.exports = {
execTask: function(cb)
{
	//console.log("RUNNING")
	if(cb== 'Water Plants')
	{
		console.log("RUNNING")
		
		waterPlant();
	}
       else if(cb== 'Check Moisture')
	{ console.log("Checking Moisture") 
	 checkMoisture();
	}

}

};
function closePins(){
 gpio.destroy(function() {
 console.log('All pins unexported');
return;
 });

}

function waterPlant(){

var Interval= setInterval(function(){
console.log(count)
gpio.setup(15,gpio.DIR_OUT)
 gpio.setup(16,gpio.DIR_OUT)
gpio.setup(29, gpio.DIR_IN,readInput);
if(count>=3)
                                {       console.log('inside if')
                                        gpio.write(15,true);
                                        gpio.write(16, true);
                                        clearInterval(Interval);
                                       closePins();
                                      	return
                                        }


//else	{
console.log('runs')
function readInput(err) {
   if (err) throw err;
  gpio.read(29, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
	if(value == false)
	{
	//gpio.write(16,true)
	count++;
	//console.log(count)
	}
    });
	
//	}

}

//gpio.destroy(function() {
  //      console.log('All pins unexported');
    //});
},2000);


}
