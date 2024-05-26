class ModuleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div class="module-card">
                <h2 class="module-name"></h2>
                <p class="module-description"></p>
                </br>
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
    
        `;
    }

    connectedCallback() {

        this.render();
    }

    static get observedAttributes() {
        return ['name', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const name = this.getAttribute('name');
        const description = this.getAttribute('description');
        this.shadowRoot.querySelector('.module-name').innerText = name;
        this.shadowRoot.querySelector('.module-description').innerHTML = description;
    }
}

customElements.define('module-card', ModuleCard);