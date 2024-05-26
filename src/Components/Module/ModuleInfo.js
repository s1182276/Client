class ModuleInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div class="flex flex-wrap lg:flex-nowrap">
                <div class="w-full lg:w-2/3 p-4">
                    <h1 class="text-lg font-semibold mb-2" id="detailTitle">Omschrijving</h1>
                    <div id="detailDescription"></div>
                </div>
                <div class="w-full lg:w-1/3 p-4 border rounded-lg overflow-hidden">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Details</h2>
                    </div>
                    <table class="w-full text-left border-gray-700">
                        <tr>
                            <th class="p-2">Propedeuse vereist?</th>
                            <td id="detailPreRequired" class="p-2"></td>
                        </tr>
                        <tr>
                            <th class="p-2">Minimaal aantal EC's</th>
                            <td id="detailMinimalEC" class="p-2"></td>
                        </tr>
                        <!-- 
                        <tr>
                            <th class="p-2 border">Niveau</th>
                            <td id="detailLevel" class="p-2 border"></td>
                        </tr>
                        -->
                        <tr>
                            <th class="p-2">Schooljaar</th>
                            <td id="detailSchoolYear" class="p-2"></td>
                        </tr>
                        <tr>
                            <th class="p-2">Semester</th>
                            <td id="detailSemester" class="p-2"></td>
                        </tr>
                        <tr>
                            <th class="p-2">Vereiste modules</th>
                            <td id="requiredModules" class="p-2">
                                <ul></ul>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <link href="https://cdn.jsdelivr.net/npm/tinymce@7.1.1/skins/content/default/content.min.css" type="text/css" rel="stylesheet">
            <link href="dist/css/app.css" type="text/css" rel="stylesheet">
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
        const prequired = this.getAttribute('prequired');
        const minimalEC = this.getAttribute('minimalEC');
        //const level = this.getAttribute('level');
        const schoolYearName = this.getAttribute('schoolYearName');
        const semester = this.getAttribute('semester');
        const requiredModules = JSON.parse(this.getAttribute('requiredModules'));

        this.shadowRoot.querySelector("#detailTitle").textContent = name;
        this.shadowRoot.querySelector("#detailDescription").innerHTML = `${description}`;
        this.shadowRoot.querySelector("#detailPreRequired").textContent = `${prequired ? 'Ja' : 'Nee'}`;
        this.shadowRoot.querySelector("#detailMinimalEC").textContent = `${minimalEC}`;
        //this.shadowRoot.querySelector("#detailLevel").textContent = `${level}`;
        this.shadowRoot.querySelector("#detailSchoolYear").textContent = `${schoolYearName}`;
        this.shadowRoot.querySelector("#detailSemester").textContent = `${semester}`;

        if(requiredModules) {
            const requiredModulesList = this.shadowRoot.querySelector("#requiredModules");
            requiredModules.forEach(module => {
                const li = document.createElement('li');
                li.classList.add('list-none');
                li.textContent = `${module.name}`;
                requiredModulesList.appendChild(li);
            });
        }
    }
}

customElements.define('module-info', ModuleInfo);