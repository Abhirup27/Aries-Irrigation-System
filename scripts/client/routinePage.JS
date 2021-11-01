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
var x=[];
getData('data/jobSchedule.JSON', function(restext){
  x=JSON.parse(restext);
  for(h=0; h<x.length; h++)
{
  console.log("running")
  row.push(document.createElement('tr'));
  row[h].id=h;
  const newRow = table.appendChild(row[h]);
  for(var i =0;i<6;i++){
    newRow.appendChild(document.createElement('td')).id= `rc${row.length}${i}`;
    cell =  newRow.children[i];
    cells.push(cell);
    switch(i)
        {
          case 0:
            cell.innerHTML=Object.values(x[h])[i]
         
            break;
          case 1:
            cell.innerHTML=Object.values(x[h])[i]
         
            break;
          case 2:
            cell.innerHTML=Object.values(x[h])[i]
         
            break;

            case 3:
            cell.innerHTML=Object.values(x[h])[i]
            break;
            case 4:
             
              cell.appendChild(document.createElement("input")).setAttribute("type", "button")
              cell.firstElementChild.setAttribute('value','EDIT')
              cell.firstElementChild.id = h;
              cell.firstElementChild.addEventListener('click', function(){
                ButtonSubmit.removeAttribute("disabled");
                this.toggleAttribute("disabled");
                this.parentElement.parentElement.children[5].firstElementChild.toggleAttribute("disabled");
                MODIFIED= true;
                TASK_TYPE.push("MODIFY")
                ROW_INDECIES.push( this.id);
                console.log(this.id)
                var l=0;
                  console.log("running")
                  while(l<4){
                    switch(l){
                      case 0:
                        var Ovalue= this.parentElement.parentElement.children[l].innerHTML;//= this.parentElement.parentElement.children[l].innerHTML;
                        this.parentElement.parentElement.children[l].innerHTML = null;
                        this.parentElement.parentElement.children[l].appendChild(new InsSelect());
                        addListener(this.parentElement.parentElement.children[l].firstElementChild)
                        break;
                      case 1:
                        var Ovalue= this.parentElement.parentElement.children[l].innerHTML;
                        this.parentElement.parentElement.children[l].innerHTML = null;
                        this.parentElement.parentElement.children[l].appendChild(new InsSelect1())
                        addListener(this.parentElement.parentElement.children[l].firstElementChild)
                        break;
                      case 2:
                        var Ovalue= this.parentElement.parentElement.children[l].innerHTML;
                        this.parentElement.parentElement.children[l].innerHTML = null;
                        this.parentElement.parentElement.children[l].appendChild(new InsTime());
                        addListener(this.parentElement.parentElement.children[l].firstElementChild)
                        break;
                      case 3:
                        var Ovalue= this.parentElement.parentElement.children[l].innerHTML;
                        this.parentElement.parentElement.children[l].innerHTML = null;
                        this.parentElement.parentElement.children[l].appendChild(new InsDate());
                        addListener(this.parentElement.parentElement.children[l].firstElementChild)
                        break;
                      default:
                        break;
                    }
                    this.parentElement.parentElement.children[l].firstElementChild.value= Ovalue;
                    inputs.push(this.parentElement.parentElement.children[l].firstElementChild);
                  l++
                }
               if(this.parentElement.parentElement.children[1].firstElementChild.value== "Daily")
               {
                this.parentElement.parentElement.children[3].firstElementChild.readOnly= true;
               }
              })
              break;
          case 5:
            cell.appendChild(document.createElement("input")).setAttribute("type", "button")
            cell.firstElementChild.setAttribute('value','DELETE')
            cell.firstElementChild.id = h;
            cell.firstElementChild.addEventListener('click', function(){
              ButtonSubmit.removeAttribute("disabled");
              ROWS_DELETED.push(this.id);
              //TASK_TYPE.push("DELETE")
             // ROW_INDECIES.push( this.id);
              table.removeChild(document.getElementById(this.id));


            });
          default:
            break;
        }
  }



  j++
}

  //console.log(x)
  })
  console.log(x)
var dataFile ='data/jobTypes.JSON'
// Http.open("GET", dataFile, true);
// Http.send();

getData(dataFile, function(responseText){
          jobTypes= JSON.parse(responseText)
          jobTypes = jobTypes[0]
          console.log("jobs entered")
})
function InsSelect(){
  var ele= document.createElement("select");
  for(var i=0; i<jobTypes.length; i++){
    ele.appendChild(document.createElement('option')).setAttribute("value", jobTypes[i]);
      var options = ele.children[i];
      //options.value = jobTypes[0][z];
      options.innerHTML = jobTypes[i]
    }
    return ele;
}
function InsSelect1()
{
  var ele= document.createElement("select");
  ele.appendChild(document.createElement('option')).setAttribute("value", "Once");
  ele.appendChild(document.createElement('option')).setAttribute("value", "Daily");
  ele.children[0].innerHTML = "Once";
  ele.children[1].innerHTML = "Daily";

  return ele;
}
function InsTime()
{
  var time=  document.createElement('input')
  time.setAttribute("type","time");
  return time;
}
function InsDate()
{
  var date = document.createElement('input');
  date.setAttribute("type","date");
  return date;
}

var date;
getData("date",function(responseText){

    date = responseText;

})
var time ;
getData('time', function(responseText){
  console.log('working!!');
time=responseText

});

var ele=0;
    var inp=0;
var jobTypes = [];
var TASK_TYPE = [];
var j=0; // NUMBER OF ROWS
var h;
var MODIFIED = false;
var ROWS_DELETED=[]
var ROW_INDECIES=[];
var ButtonAdd = document.getElementById('ADD');
var ButtonDelete = document.getElementById('DELETEALL')
var ButtonSubmit =document.getElementById('SET');
var row =[]
var cell;
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


ButtonAdd.onclick = function(){
  TASK_TYPE.push("ADD")
  ButtonSubmit.removeAttribute("disabled");

    row.push(document.createElement('tr'));
    const newRow = table.appendChild(row[j])
      for(var i =0;i<4;i++){
        newRow.appendChild(document.createElement('td')).id= `rc${row.length}${i}`;
        cell =  newRow.children[i];
        cells.push(cell);
        // MAKE IF CONDITONS FOR DIFFERENT ROWS IN THE TABLE FOR MAKING DIFFERENT INPUT FEILDS!
        switch(i)
        {
          case 0:
           
            cell.appendChild(document.createElement('select'));
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
    var type =0;
    var z=3;
    var tempVal;
    var Rowindex=0;
    while(type<TASK_TYPE.length)

{    if(TASK_TYPE[type] == "ADD")
    {
    //while(inp<inputs.length){
      z=3;  // FOR EACH ROW/ LITERAL OBJECTS
    x.push(Object(  
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
    //console.log(inp);
        ele++;
      //}
    //sendForm("/routine/ADD");
  //sendData('routineSUBMIT', function(response){ console.log(response)})
  ButtonSubmit.toggleAttribute("disabled");
  }
  else if(TASK_TYPE[type] == "MODIFY"){
    
    //while(Rowindex <ROW_INDECIES.length){
    appendJSON(ROW_INDECIES[Rowindex]);
      Rowindex++;
   // }
    ButtonSubmit.toggleAttribute("disabled");
    //sendForm("/routine/ADD");

  }
  // else if(TASK_TYPE[type] == "DELETE")
  //   {
  //     x.splice(Rowindex)
  //     Rowindex++;
  //     var RI;
  //     for(RI=Rowindex; RI<ROW_INDECIES.length; RI++)
  //       {
  //         ROW_INDECIES[RI]--;
  //       }
  //   }
  type++;
}
if(ROWS_DELETED.length!=0){
  var RI=0;
  console.log(ROWS_DELETED.length)
  while(RI<ROWS_DELETED.length)
  {
      console.log(ROWS_DELETED[RI])
      delete x[ROWS_DELETED[RI]]
    x.splice(ROWS_DELETED[RI],1)
    RI++
  }
}


sendForm("/routine/ADD");
  }
ButtonDelete.onclick = function(){
  x = []
  sendForm("/routine/ADD");

}

function changeState()
{
  var time = new Date();
  var element = this;
//Detecting values of input element passed to this callback function as 'this'
if(element.type == "time")
{
  getData("time",function(responseText){
    time = responseText;
    console.log(time)
    console.log(element.value<time )//&& element.parentElement.parentElement.children[3].firstElementChild.value!=date )//&& element.parentElement.parentElement.children[1].firstElementChild.value == "Daily")
    if(element.value<=time && element.parentElement.parentElement.children[3].firstElementChild.value==date){
     var dt=  Number(element.parentElement.parentElement.children[3].firstElementChild.value.slice(8,10))+1
      //console.log(String(dt).length)
      if(String(dt).length ==1)
      {
        dt= 0+ String(dt)
      }
      console.log(dt)
      element.parentElement.parentElement.children[3].firstElementChild.value = element.parentElement.parentElement.children[3].firstElementChild.value.slice(0,8) + dt; 
     console.log(date.slice(8,10) +1 )
    }
    else if( element.value>time && element.parentElement.parentElement.children[3].firstElementChild.value!=date && element.parentElement.parentElement.children[1].firstElementChild.value == "Daily")
    {
      
      element.parentElement.parentElement.children[3].firstElementChild.value = date
    }
  });
}
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
  element.parentElement.parentElement.children[2].firstElementChild.setAttribute("min",(time))
}else if(this.value!=date && this.parentElement.parentElement.children[1].firstElementChild.value =="Daily"){
  console.log("triggered2")
  element.parentElement.parentElement.children[2].firstElementChild.removeAttribute("min")
}

if(this.value=="Once" && this.parentElement.parentElement.children[3].firstElementChild.value ==date)
{
  element.parentElement.parentElement.children[2].firstElementChild.setAttribute("min",(time))
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
            Http.abort();
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
            location.reload();
          }
        }
xmlhttp.send(JSON.stringify(x));


}

function appendJSON(rowI)
{
  
 x[rowI].jobType = inputs[inp].value;
 inp++;
 x[rowI].occur = inputs[inp].value;
 inp++;
 x[rowI].time = inputs[inp].value;
 inp++;
 x[rowI].date = inputs[inp].value;
 inp++;
}