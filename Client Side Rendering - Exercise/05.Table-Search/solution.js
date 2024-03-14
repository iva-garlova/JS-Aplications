import { html, render } from "./node_modules/lit-html/lit-html.js";
document.querySelector('#searchBtn').addEventListener('click', onClick);

const url = "http://localhost:3030/jsonstore/advanced/table";

const input = document.getElementById('searchField');
const table = document.querySelector('table.container'); 
const rows = table.getElementsByTagName("tr") 
const root = table.querySelector('tbody');
  


takeData()
async function takeData() {
   const response = await fetch(url);
   const data = await response.json();
   const option = Object.values(data).map(op => template(op));
   update(option)

   

}

function template(data){
   return html`
   <tr>
                <td>${data.firstName} ${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.course}</td>
            </tr>`
}

function update(data){
   render(data, root)
}

function onClick(e) {
   e.preventDefault();
    const text = input.value;
    input.value = "";
    highlightRows(text);
   

}

function highlightRows(text) {

   for (let i = 0; i < rows.length; i++) {
     const cells = rows[i].getElementsByTagName('td');
     let matchFound = false;

     for (let j = 0; j < cells.length; j++) {
       if (cells[j].textContent.includes(text)) {
         matchFound = true;
         break;
       }
     }
     let element = rows[i];

     if (matchFound) {
   element.style.backgroundColor = 'yellow'
     } else {
      element.style.backgroundColor = '';
     }
   }
 }

