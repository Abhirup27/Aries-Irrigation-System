
var job = {
  jobType: "water",
occur: "once",
time : "",
date : "",
}
function change(JOBTYPE, OCCUR, TIMES,DATES){
  this.jobType = JOBTYPE;
  this.occur= OCCUR;
  this.time= TIMES;
  this.date = DATES;

}
var x = Array();
var dataFile ='data/jobTypes.JSON'
// Http.open("GET", dataFile, true);
// Http.send();
getData(dataFile, function(responseText){
          jobTypes= JSON.parse(responseText)
          jobTypes = jobTypes[0]
          console.log("jobs entered")

})
var date;
getData("date",function(responseText){

    date = responseText;

})
var time ;
getData('time', function(responseText){console.log('working!!');time=( JSON.parse(responseText))})

var recievedTable ;
var ele=0;
    var inp=0;
var jobTypes = [];
var j=0; // NUMBER OF ROWS
var ButtonAdd = document.getElementById('ADD');
var ButtonSubmit =document.getElementById('SET');
var row =[] 
var cells= []
var inputs = []
var coll =document.createElement('td')
  //.id = "tb" //.setAttribute("id","table"); 
  
 document.getElementsByTagName("body")[0].appendChild(document.createElement("table"))
 document.getElementsByTagName("table")[0].setAttribute("id","tb");
const table= document.getElementById("tb");
table.appendChild(document.createElement("tr"));
var head = table.firstElementChild;

head.appendChild(document.createElement('td')).innerHTML="Type";
var cell1= head.children[0]
cell1.setAttribute("style","text-align:center;width: 120px;")
head.appendChild(document.createElement('td')).innerHTML="Occurance";
var cell1= head.children[1]
cell1.setAttribute("style","width: 50px;text-align:center;")
head.appendChild(document.createElement('td')).innerHTML="Time";
var cell1= head.children[2]
cell1.setAttribute("style","width: 50px;text-align:center;")
head.appendChild(document.createElement('td')).innerHTML="Date";
var cell1= head.children[3]

cell1.setAttribute("style","text-align:center;")
//request Server for the schedule.JSON
getData('data/jobSchedule.JSON', function(restext){
recievedTable=JSON.parse(restext);
console.log(recievedTable)
})



ButtonAdd.onclick = function(){
  ButtonSubmit.removeAttribute("disabled");

    row.push(document.createElement('tr'));
    const newRow = table.appendChild(row[j])
      for(var i =0;i<4;i++){
        newRow.appendChild(document.createElement('td')).id= `rc${row.length}${i}`;
        var cell =  newRow.children[i];
        cells.push(cell);
        // MAKE IF CONDITONS FOR DIFFERENT ROWS IN THE TABLE FOR MAKING DIFFERENT INPUT FEILDS!
        switch(i)
        {
          case 0:
            
            cell.appendChild(document.createElement('select')).setAttribute("form","setRoutine");
            var select = cell.getElementsByTagName('select')[0];
            
            for(var z=0; z< Number(jobTypes.length); z++)
            {
              //console.log("running");
            select.appendChild(document.createElement('option')).setAttribute("value", jobTypes[z]);
            var options = select.children[z];
            //options.value = jobTypes[0][z];
            options.innerHTML = jobTypes[z]
            }
            break;
          case 1:
            cell.appendChild(document.createElement('select')).setAttribute("form","setRoutine");
            cell.getElementsByTagName('select')[0].appendChild(document.createElement('option')).setAttribute("value", "Once");
            cell.getElementsByTagName('select')[0].children[0].innerHTML= 'Once';
            cell.getElementsByTagName('select')[0].appendChild(document.createElement('option')).setAttribute("value", "Daily");
            cell.getElementsByTagName('select')[0].children[1].innerHTML= 'Daily';
               //  function(cell){console.log("hello")}   // I WAS HERE LAST TIME!!
            break;
          case 2:

            cell.appendChild(document.createElement('input')).setAttribute("type","time");
            cell.children[0].setAttribute("form","setRoutine")
            cell.children[0].setAttribute("required","true");
            break;
          case 3:
            cell.appendChild(document.createElement('input')).setAttribute("type","date");
            cell.children[0].setAttribute("min",date); 
            cell.children[0].setAttribute("required",true); 
            cell.children[0].setAttribute("form","setRoutine") 
            break;
          default:
            break;
        }
        cell.firstElementChild.setAttribute("name","test")
        addListener(cell.firstElementChild);
        
        inputs.push(cell.firstElementChild);

        //cell.appendChild(document.createElement('select')).setAttribute("type","select"); 
        // ANOTHER LOOP TO ENTER OPTIONS IN SELECT
        
        // ------
        }
    
    // newRow.appendChild(document.createElement('td')).id='1';
    // newRow.appendChild(document.createElement('td')).id='2';
    // newRow.appendChild(document.createElement('td')).id='3';
    //newRow.children[0].appendChild(document.createElement('select')).setAttribute("type","select"); 
   //newRow.children[0].firstChild.appendChild(document.createElement('option')).value = "Water Plant" 
    //var cell =  newRow.children[0];
   // var select = document.getElementsByTagName('select')[0];
    // var options = select.firstElementChild;
    // options.innerHTML = "Water Plants";


    j++; // INCRIMENTING NUMBER OF ROWS
}
function addListener(element){
  
  element.addEventListener("change", changeState)
}

  ButtonSubmit.onclick = function() {  // SUBMIT BUTTON
  
    var z=3;
    var tempVal;
    while(inp<inputs.length){
      z=3;
    x[ele]= (Object(  
      {  
    'jobType': inputs[inp].value,
    'occur' : inputs[++inp].value,
    'time' : inputs[++inp].value,
    'date' : inputs[++inp].value }));
    while(z>=0)
    {

    tempVal= inputs[inp-z].value
    inputs[inp-z].parentElement.innerHTML= inputs[inp-z].value;
    console.log(cells[inp-z].innerHTML)
    --z;
    }
    inp++;
        ele++;
      }
    sendForm("/routine/ADD");
  //sendData('routineSUBMIT', function(response){ console.log(response)})


  ButtonSubmit.toggleAttribute("disabled");
}

function changeState()
{
  var element = this;
//Detecting values of input element passed to this callback function as 'this'
if(this.value=="Daily"){
  //console.log("Daily")
  getData("date",function(responseText){
    date = responseText;
    element.parentElement.parentElement.children[3].firstElementChild.value=date;
    element.parentElement.parentElement.children[3].firstElementChild.readOnly = true;
    });
 // console.log(date)
}
if(this.value=="Once"){
  getData("date",function(responseText){
      console.log("change to once")
    date = responseText;
    element.parentElement.parentElement.children[3].firstElementChild.value=date;
    element.parentElement.parentElement.children[3].firstElementChild.readOnly = false;
})
console.log('working')
}
if(this.value==date && this.parentElement.parentElement.children[1].firstElementChild.value =="Once"){
  console.log("triggered")
  element.parentElement.parentElement.children[2].firstElementChild.setAttribute("min",(time[0]+':'+time[1]))
}else if(this.value!=date && this.parentElement.parentElement.children[1].firstElementChild.value =="Daily"){
  console.log("triggered2")
  element.parentElement.parentElement.children[2].firstElementChild.removeAttribute("min")
}

if(this.value=="Once" && this.parentElement.parentElement.children[3].firstElementChild.value ==date)
{
  element.parentElement.parentElement.children[2].firstElementChild.setAttribute("min",(time[0]+':'+time[1]))
}
if(this.value=="Daily" || this.parentElement.parentElement.children[3].firstElementChild.value !=date ){
  element.parentElement.parentElement.children[2].firstElementChild.removeAttribute("min");
}
}


function getData(data, cb)
{
  const Http = new XMLHttpRequest();
  Http.open("GET", data, true);
  Http.responseType = "text"
  Http.send();
      Http.onreadystatechange = function() {
        
          if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;     // This will be inside  the select loop  
            //console.log(this.status);
            //console.log(this.responseText)
            cb(this.responseText);
  
          }
        };
   

}
// function sendData(data, cb)
// {
 
//   const Http = new XMLHttpRequest();
//   //Http.open("POST", data, true);

//   fetch(data, {
//     method : "POST",
//     body: new FormData(document.getElementById("setRoutine")),
//     // -- or --
//     // body : JSON.stringify({
//         // user : document.getElementById('user').value,
//         // ...
//     // })
// }).then(
//     response => response.text() // .json(), etc.
//     // same as function(response) {return response.text();}
// ).then(
//     html => console.log(html)
// );
//   //Http.responseType = "text"

//       // Http.onreadystatechange = function() {
        
//       //     if (this.readyState == 4 && this.status == 200) {
//       //       //document.getElementById("demo").innerHTML = this.responseText;     // This will be inside  the select loop  
//       //       //console.log(this.status);
//       //       console.log(this.responseText)
//       //       cb(this.responseText);
  
//       //     }
//       //   };
//         //Http.send();
   

// }

function sendForm(theUrl)
{
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 

xmlhttp.open("POST", theUrl);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.onreadystatechange = function() {
        
          if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;     // This will be inside  the select loop  
            //console.log(this.status);
            console.log(this.responseText);
          }
        }
xmlhttp.send(JSON.stringify(x));


}