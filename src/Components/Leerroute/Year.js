// const template = document.createElement("template");
// template.innerHTML = `
//      <div >   
//         <h5 class="mb-4 text-xl font-bold"></h5>

//         <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer semester-chooser" semester="1">
//             <b>Semester 1</b>
//             <p>Klik hier om een module te kiezen</p>
//         </div>
//         <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer semester-chooser" semester="2">
//             <b>Semester 2</b>
//             <p>Klik hier om een module te kiezen</p>
//         </div>
//     </div>

//     <!-- Modal -->
// <div id="semesterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden">
//     <div class="bg-white p-8 rounded-lg sm:w-full md:w-5/6 xl:w-2/3 max-h-[80%] overflow-y-auto">
//         <div class="p-8">
//             <div class="flex justify-between items-center mb-4">
//                 <h2 class="text-xl font-semibold">Module keuze</h2>
//                 <div class="ml-auto flex">
//                     <button id="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Sluit</button>
//                 </div>
//             </div>
//         </div>

//         <div class="flex flex-wrap -mx-4 justify-evenly" id="blockContainer">
//             <!-- Dynamic blocks will be added here -->
//         </div>
//     </div>
//     <link href="dist/css/app.css" type="text/css" rel="stylesheet">
// `;

// class Year extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: "open" });
//         this.shadowRoot.appendChild(template.content.cloneNode(true));

//         const year = this.getAttribute('year') ?? '1';
//         this.shadowRoot.querySelector('h5').innerText = 'Jaar ' + year;

//         this.semesterChoosers = this.shadowRoot.querySelectorAll('.semester-chooser');
//         this.semesterChoosers.forEach(chooser => {
//             chooser.addEventListener('click', this.showModulePopup.bind(this));
//         });

//         this.closeModalBtn = this.shadowRoot.querySelector('#closeModal');
//         this.closeModalBtn.addEventListener('click', this.closeModal.bind(this));

//         //event listener to close semester-chooser module when clicking outside the box
//         this.semesterModel = this.shadowRoot.querySelector("#semesterModal");
//     }

//     async showModulePopup(event) {
//         const semester = event.currentTarget.getAttribute('semester');
//         const semesterModal = this.shadowRoot.querySelector('#semesterModal');
//         const blockContainer = this.shadowRoot.querySelector('#blockContainer');
//         blockContainer.innerHTML = '';


//         window.apiModule.getAllModules().then(modules => {
//             blockContainer.innerHTML = ''; 
//             modules.forEach(module => {
//                 const moduleCard = document.createElement('module-card');
//                 moduleCard.className = 'box-border flex flex-col p-2 mb-4 sm:w-full sm:mb-6 md:mb-12 md:w-2/5 lg:w-3/12 xl:w-2/12 bg-gray-100 rounded-lg shadow-md hover:cursor-pointer transition-colors duration-75 px-4 mx-4';
//                 moduleCard.setAttribute('moduleid', module.id);
//                 moduleCard.setAttribute('name', module.name);
//                 moduleCard.setAttribute('description', module.description);
//                 blockContainer.appendChild(moduleCard);

//                 moduleCard.addEventListener('click', () => {
//                     this.addModuleToSemester(moduleCard, semester);
//                     semesterModal.classList.add('hidden');
//                 });

//                 const moreInfo = moduleCard.shadowRoot.querySelector('#moreInfo');
//                 moreInfo.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     this.loadModuleInfo(module.id);
//                 });
//             });
//         });
//     }

//     closeModal(event){
//         const semesterModal = this.shadowRoot.querySelector("#semesterModal");
//         const blockContainer = this.shadowRoot.querySelector("#blockContainer");
//         const blockContainerInfo = this.shadowRoot.querySelector("#blockContainerInfo");
//         semesterModal.classList.add('hidden');
//         blockContainer.classList.add('hidden');
//         blockContainerInfo.classList.add('hidden');
//     };

//     addModuleToSemester(module, semester) {
//         const semesterChooser = this.shadowRoot.querySelector(`.semester-chooser[semester="${semester}"]`);
//         semesterChooser.innerHTML = ''; 
//         module.classList = ''; 
//         module.removeAttribute("description");
//         semesterChooser.appendChild(module);
//     }

//     loadModuleInfo(moduleId) {
//         window.apiModule.getModuleInfo(moduleId).then(module => {
//             const blockContainer = this.shadowRoot.querySelector("#blockContainer");
//             const blockContainerInfo = this.shadowRoot.querySelector("#blockContainerInfo");
//             blockContainer.classList.add('hidden');
//             blockContainerInfo.innerHTML = '';
//             blockContainerInfo.classList.remove('hidden');

//             // create module info component
//             const moduleInfo = document.createElement('module-info');
//             moduleInfo.className = 'box-border flex flex-col p-6 mb-8 w-full bg-inherit rounded-lg shadow-md transition-colors duration-75 px-4 mx-4';
//             moduleInfo.setAttribute('moduleid', module.id);
//             moduleInfo.setAttribute('name', module.name);
//             moduleInfo.setAttribute('description', module.description);
//             moduleInfo.setAttribute('prequired', module.prequired);
//             moduleInfo.setAttribute('minimalEC', module.minimalEC);
//             moduleInfo.setAttribute('schoolYearName', module.schoolYear ? module.schoolYear.name : '');
//             moduleInfo.setAttribute('semester', module.semester);

//             let requiredModules = [];
//             if (module.entryRequirementsModule !== null) {
//                 for(const entryRequirement of module.entryRequirementModules) {
//                     window.apiModule.getModuleInfo(entryRequirement.moduleId).then((module) => {
//                         requiredModules.push(module);
//                     });
//                 }
//             }

//             moduleInfo.setAttribute('requiredModules', JSON.stringify(requiredModules));
//             blockContainerInfo.appendChild(moduleInfo);

//             // event listener to close module info
//             moduleInfo.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 blockContainerInfo.classList.add('hidden');
//                 blockContainer.classList.remove('hidden');
//             });
//         });
//     }
// }

// window.customElements.define('leerroute-year', Year);



