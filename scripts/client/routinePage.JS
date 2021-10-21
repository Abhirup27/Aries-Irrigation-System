const Http = new XMLHttpRequest();
var dataFile ='data/jobTypes.JSON'
Http.open("GET", dataFile, true);
Http.send();
    Http.onreadystatechange = function() {
      
        if (this.readyState == 4 && this.status == 200) {
          //document.getElementById("demo").innerHTML = this.responseText;     // This will be inside  the select loop  
        //  console.log(this.responseText)
          jobTypes= JSON.parse(this.responseText)
          jobTypes = jobTypes[0]

        }
      };
//Http.setRequestHeader('Content-Type', 'text/plain');
var jobTypes = [];

var j=0;
var varB = document.getElementById('ADD');
var row =[] //document.createElement('tr');
var coll =document.createElement('td')
  //.id = "tb" //.setAttribute("id","table"); 
 document.getElementsByTagName("body")[0].appendChild(document.createElement("table"))
 document.getElementsByTagName("table")[0].setAttribute("id","tb");
const table= document.getElementById("tb");
varB.onclick = function(){

    row.push(document.createElement('tr'));
    const newRow = table.appendChild(row[j]);
      for(var i =0;i<3;i++){
        newRow.appendChild(document.createElement('td')).id= `rc${row.length}${i}`;
        var cell =  newRow.children[i];
        // MAKE IF CONDITONS FOR DIFFERENT ROWS IN THE TABLE FOR MAKING DIFFERENT INPUT FEILDS!
        switch(i)
        {
          case 0:
            
            cell.appendChild(document.createElement('select'));
            var select = cell.getElementsByTagName('select')[0];
            
            for(var z=0; z< Number(jobTypes.length); z++)
            {
              console.log("running");
            select.appendChild(document.createElement('option')).setAttribute("value", jobTypes[z]);
            var options = select.children[z];
            //options.value = jobTypes[0][z];
            options.innerHTML = jobTypes[z]
            }
            break;
          case 1:
            cell.appendChild(document.createElement('input')).setAttribute("type","time");
            break;
          case 2:
            cell.appendChild(document.createElement('select'));
            cell.getElementsByTagName('select')[0].appendChild(document.createElement('option')).setAttribute("value", "Once");
            cell.getElementsByTagName('select')[0].children[0].innerHTML= 'Once';
            cell.getElementsByTagName('select')[0].appendChild(document.createElement('option')).setAttribute("value", "Daily");
            cell.getElementsByTagName('select')[0].children[1].innerHTML= 'Daily';
            break;
          default:
            break;
        }

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
    j++;
}



function Coll(){
    return document.createElement('td');

}