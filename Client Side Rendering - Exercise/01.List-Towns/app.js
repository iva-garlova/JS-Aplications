import { html, render } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector('form').addEventListener('submit', onSumbit);
const root = document.getElementById('root');

function onSumbit(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const townList = formData.get('towns').split(", ");
    renderer(createTemp(townList));
    
}

function createTemp(towns){
    return html`
    <ul>
${towns.map(town => html`<li>${town}</li>`)}
    </ul>
    `
}

function renderer(tepmplate){
render(tepmplate, root);
}