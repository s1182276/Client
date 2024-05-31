const template = document.createElement("template");
template.innerHTML = `
  <div class="module-card">
    <h2 class="module-name text-xl font-semibold"></h2>
    <p class="module-description"></p>
    <a id="moreInfo" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Lees meer</a>
  </div>

    <style>
    .module-description {
      font-size: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5; 
      -webkit-box-orient: vertical;
    }
  </style>
    <link href="dist/css/app.css" type="text/css" rel="stylesheet">

`;

class ModuleCardJs extends HTMLElement {
    constructor() {
        super();
        const templateContent = template.content;
        this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        this.render();
      }
  
      static get observedAttributes() {
        return ['moduleid', 'name', 'description'];
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'moduleid' || name === 'name' || name === 'description') {
          this.render();
        }
      }
  
      render() {
        const name = this.getAttribute('name');
        const description = this.getAttribute('description');
        this.shadowRoot.querySelector('.module-name').textContent = name;
        this.shadowRoot.querySelector('.module-description').textContent = description;
      }
}

if (!customElements.get('module-card-js')) {
    customElements.define('module-card-js', ModuleCardJs);
}