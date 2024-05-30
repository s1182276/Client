import './module-card.js';

const template = document.createElement("template");
template.innerHTML = `
  <style>
    .module-description {
      font-size: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .hidden {
      display: none;
    }
  </style>
  <div>
    <h5 class="mb-4 text-xl font-bold" id="yearTitle"></h5>
    <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer semester-chooser" semester="1">
      <b>Semester 1</b>
      <p>Klik hier om een module te kiezen</p>
    </div>
    <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer semester-chooser" semester="2">
      <b>Semester 2</b>
      <p>Klik hier om een module te kiezen</p>
    </div>
  </div>

  <!-- Modal -->
  <div id="semesterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden">
    <div class="bg-white p-8 rounded-lg sm:w-full md:w-5/6 xl:w-2/3 max-h-[80%] overflow-y-auto">
      <div class="p-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Module keuze</h2>
          <div class="ml-auto flex">
            <button id="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Sluit</button>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4 justify-evenly" id="blockContainer">
        <!-- Dynamic blocks will be added here -->
      </div>
    </div>
  </div>
    <link href="dist/css/app.css" type="text/css" rel="stylesheet">
`;

class LeerrouteYear extends HTMLElement {
    constructor() {
        super();
        const templateContent = template.content;
        this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
      }
  
      static get observedAttributes() {
        return ['year', 'modules', 'year-title'];
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'year' || name === 'modules' || name === 'year-title') {
          this.render();
        }
      }
  
      render() {
        const year = this.getAttribute('year');
        const yearTitle = this.getAttribute('year-title') || `Jaar ${year}`;
        this.shadowRoot.getElementById('yearTitle').textContent = yearTitle;
      }
  
      setupEventListeners() {
        const semesterChoosers = this.shadowRoot.querySelectorAll('.semester-chooser');
        semesterChoosers.forEach(chooser => {
          chooser.addEventListener('click', this.showModulePopup.bind(this));
        });
  
        this.shadowRoot.getElementById('closeModal').addEventListener('click', this.closeModal.bind(this));
      }
  
      async showModulePopup(event) {
        const semester = event.currentTarget.getAttribute('semester');
        const semesterModal = this.shadowRoot.querySelector('#semesterModal');
        const blockContainer = this.shadowRoot.querySelector('#blockContainer');
        blockContainer.innerHTML = '';
  
        const modules = await window.apiModule.getAllModules();
        modules.forEach(module => {
          const moduleCard = document.createElement('module-card');
          moduleCard.className = 'box-border flex flex-col p-2 mb-4 sm:w-full sm:mb-6 md:mb-12 md:w-2/5 lg:w-3/12 xl:w-2/12 bg-gray-100 rounded-lg shadow-md hover:cursor-pointer transition-colors duration-75 px-4 mx-4';
          moduleCard.setAttribute('moduleid', module.id);
          moduleCard.setAttribute('name', module.name);
          moduleCard.setAttribute('description', module.description);
          blockContainer.appendChild(moduleCard);
          moduleCard.addEventListener('click', () => {
            this.addModuleToSemester(moduleCard, semester);
            semesterModal.classList.add('hidden');
          });
          const moreInfo = moduleCard.shadowRoot.querySelector('#moreInfo');
          moreInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            this.loadModuleInfo(module.id);
          });
        });
  
        semesterModal.classList.remove('hidden');
      }
  
      closeModal() {
        const semesterModal = this.shadowRoot.querySelector("#semesterModal");
        semesterModal.classList.add('hidden');
      }
  
      addModuleToSemester(moduleCard, semester) {
        const semesterChooser = this.shadowRoot.querySelector(`.semester-chooser[semester="${semester}"]`);
        //semesterChooser.innerHTML = '';
        //moduleCard.classList = '';
        moduleCard.removeAttribute("description");
        semesterChooser.appendChild(moduleCard);
      }
  
      async loadModuleInfo(moduleId) {
        // Implement the logic to load and display module information
      }
}

if (!customElements.get('leerroute-year')) {
    customElements.define('leerroute-year', LeerrouteYear);
}