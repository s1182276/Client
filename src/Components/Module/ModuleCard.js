const template = document.createElement("template");
template.innerHTML = `
<div>
    <b id="title"></b>
    <p id="description"></p>
    </br>
    <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Lees meer</a>
</div>
<link href="dist/css/app.css" type="text/css" rel="stylesheet">
`;

class ModuleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const description = this.getAttribute('description');
        const moduleId = this.getAttribute('moduleid');

        const shortDescription = description.slice(0, 80) + '...';

        this.shadowRoot.querySelector("#title").textContent = name;
        this.shadowRoot.querySelector("#description").textContent = shortDescription;
    }
}

window.customElements.define('module-card', ModuleCard);