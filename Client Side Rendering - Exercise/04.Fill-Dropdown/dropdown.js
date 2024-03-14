import {html, render} from "./node_modules/lit-html/lit-html.js";
const root = document.getElementById("menu");
document.querySelector('form').addEventListener('submit', addItem)

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

onLoad()
async function onLoad(){

const responce = await fetch(url);
const data = await responce.json();
const option = Object.values(data).map(op => temp(op));
update(option)

}

function temp(data){
    return html`
    <option values=${data._id}>${data.text}</option>`
}

function update(data){
render(data, root)
}

function addItem(e) {
    e.preventDefault();
    const input = document.getElementById('itemText');
    const text = input.value;
    input.value = "";
    addItemInDb({text})

}

async function addItemInDb(data){
const responce = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

})
onLoad();
}