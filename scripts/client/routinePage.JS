const Http = new XMLHttpRequest();
var j=0;
var varB = document.getElementById('ADD');
var row =[] //document.createElement('tr');
var coll =document.createElement('td')
  //.id = "tb" //.setAttribute("id","table"); 
 document.getElementsByTagName("body")[0].appendChild(document.createElement("table"))
 document.getElementsByTagName("table")[0].setAttribute("id","tb");
const table= document.getElementById("tb");
varB.onclick = function(){
    var dataFile = 'data/jobTypes.JSON'
    Http.open("GET", dataFile, true);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //document.getElementById("demo").innerHTML = this.responseText;     // This will be inside  the select loop  
        }
      };
    row.push(document.createElement('tr'));
    const newRow = table.appendChild(row[j]);
      for(var i =0;i<3;i++){
        newRow.appendChild(document.createElement('td')).id='rc`${row.length}``${i}`';
        var cell =  newRow.children[i];
        // MAKE IF CONDITONS FOR DIFFERENT ROWS IN THE TABLE FOR MAKING DIFFERENT INPUT FEILDS!
        cell.appendChild(document.createElement('select')).setAttribute("type","select"); 
        var select = cell.getElementsByTagName('select')[0];
        select.appendChild(document.createElement('option')).value = "Water Plant" 
        var options = select.firstElementChild;
        options.innerHTML = "Water Plants";
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