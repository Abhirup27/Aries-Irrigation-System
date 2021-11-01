import RPi.GPIO as GPIO
from threading import Timer
import sys 
import json
countd=0
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(15, GPIO.OUT)
GPIO.setup(29, GPIO.IN)

GPIO.output(16, GPIO.LOW)
GPIO.output(15,GPIO.LOW)

run = True

def read():
	
	global run,countd
	value = GPIO.input(29)
	if(countd>=3):
                
                
                x= { "result": 1  }
                GPIO.output(16, GPIO.HIGH)
                GPIO.output(15,GPIO.HIGH)
                GPIO.cleanup()
                print(json.dumps(x))
	        run = False

	if(value == 0):
                
	
                 countd+=1	
		
		
	if run:
                
		Timer(2,read).start()

read()

