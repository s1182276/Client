const template = document.createElement("template");
template.innerHTML = `
        <h5 class="text-xl font-bold mb-4"></h5>

        <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75">
            <b>Semester 1</b>
            <p>Klik hier om een module te kiezen</p>
        </div>
        <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75">
            <b>Semester 2</b>
            <p>Klik hier om een module te kiezen</p>
        </div>
    </div>
    <link href="dist/css/app.css" type="text/css" rel="stylesheet">
`;

class Year extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector("h5").innerText = 'Jaar ' + this.attributes.getNamedItem('year').value ?? '1'
    }
}

window.customElements.define('leerroute-year', Year);