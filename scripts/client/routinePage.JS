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


ButtonAdd.onclick = function(){
  ButtonSubmit.removeAttribute("disabled");

    row.push(document.createElement('tr'));
    const newRow = table.appendChild(row[j]);
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

  ButtonSubmit.onclick = function() {

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
            console.log(this.responseText)
            cb(this.responseText);
  
          }
        };
   

}