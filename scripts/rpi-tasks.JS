var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var soilActivate = new Gpio(22, 'out'); //use GPIO pin 4 as output
var soilSense= new Gpio(5, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var motorActivate = new Gpio(23, 'out')


module.exports = {
execTask: function(cb)
{
		motorActivate.writeSync(0);
		soilActivate.writeSync(0)
var count=0;

	//console.log("RUNNING")
	if(cb== 'Water Plants')
	{
		console.log("RUNNING")
var Interval = setInterval(function(){
var value = soilSense.readSync()
if(value==0){
        count++;
        console.log(count)
        // motorActivate.writeSync(1); //turn LED on or off depending on the button state (0 or 1)
}
//else{
//  motorActivate.writeSync(0); //turn LED on or off depending on the button state (0 or 1)
// }
if(count>=3){
clearInterval(Interval)
unexportOnClose();
return;
}
},2000);
		
		
	}
       else if(cb== 'Check Moisture')
	{ console.log("Checking Moisture") 
	 checkMoisture();
	}

}

};

function unexportOnClose() { //function to run when exiting program
  motorActivate.writeSync(1); // Turn LED off
//  motorActivate.unexport(); // Unexport LED GPIO to free resources
  //soilSense.unexport(); // Unexport Button GPIO to free resources
 soilActivate.writeSync(1);
 //soilActivate.unexport();
return;
};

process.on('SIGINT', unexportOnClose);
