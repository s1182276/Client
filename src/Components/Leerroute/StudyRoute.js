import ApiService from '../../Services/ApiService.js';
import './StudyRouteYear.js';


const template = document.createElement("template");
template.innerHTML = `
<input id="studyRouteName" type="text" placeholder="Naam van de studieroute" class="mt-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
  <select id="studyRoutesDropdown" class="mt-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <option value="">Selecteer een leerroute</option>
  </select>
  <div class="flex flex-col items-center w-full md:flex-row md:justify-center md:flex-wrap" id="school-career"></div>
  <button id="addYearBtn" class="mt-4 rounded-full py-2 px-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Voeg schooljaar toe</button>
  <button id="saveBtn" class="mt-4 rounded-full py-2 px-4 bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Opslaan</button>
    <link href="dist/css/app.css" type="text/css" rel="stylesheet">
`;

class StudyRouteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        this.currentStudyRouteId = null; // Track current study route
        this.existingSemesters = new Map(); // Initialize the map for existing semesters
    }

    async connectedCallback() {
        const isLoggedIn = window.msalModule.getActiveAccount() !== null;
        this.render(isLoggedIn);

        if (isLoggedIn) {
            await this.loadStudyRoutes();
            this.shadowRoot.getElementById('saveBtn').hidden = false;
            this.shadowRoot.getElementById('studyRoutesDropdown').hidden = false;
            this.shadowRoot.getElementById('saveBtn').addEventListener('click', this.saveStudyRoutes.bind(this));
            this.shadowRoot.getElementById('studyRoutesDropdown').addEventListener('change', this.loadStudyRoute.bind(this));
        } else {
            this.shadowRoot.getElementById('saveBtn').hidden = true;
            this.shadowRoot.getElementById('studyRoutesDropdown').hidden = true;
            this.shadowRoot.getElementById('studyRouteName').hidden = true;
        }

        this.shadowRoot.getElementById('addYearBtn').addEventListener('click', this.addYear.bind(this));
    }

    async render(isLoggedIn) {
        const token = isLoggedIn ? await window.msalModule.acquireTokenSilent() : null;
        const modules = await ApiService.retrieveModules(token);
        this.populateYears(modules, isLoggedIn);
    }

    async loadStudyRoutes() {
        const token = await window.msalModule.acquireTokenSilent();
        const studyRoutes = await ApiService.retrieveStudyRoutes(token);
        const dropdown = this.shadowRoot.getElementById('studyRoutesDropdown');
        dropdown.innerHTML = `<option value="">Selecteer een leerroute</option>`;
        studyRoutes.forEach((route, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = route.name;
            dropdown.appendChild(option);
        });
    }

    populateYears(modules, isLoggedIn) {
        const container = this.shadowRoot.getElementById('school-career');
        container.innerHTML = '';
        for (let year = 1; year <= 4; year++) {
            const yearElement = document.createElement('leerroute-year');
            yearElement.setAttribute('year', year);
            yearElement.setAttribute('modules', JSON.stringify(modules));
            yearElement.setAttribute('year-title', `Jaar ${year}`);
            container.appendChild(yearElement);
        }
    }

    addYear() {
        // TODO: A school year should be added on the backend side, the logic there should now what school year to add. Example after 2023-2024 the school year 2024-2025 should be added.
        const container = this.shadowRoot.getElementById('school-career');
        const currentYears = container.querySelectorAll('leerroute-year').length;
        const newYear = document.createElement('leerroute-year');
        newYear.setAttribute('year', currentYears + 1);
        newYear.setAttribute('modules', '[]'); // Assuming modules is an empty array initially
        newYear.setAttribute('year-title', `Jaar ${currentYears + 1}`);
        container.appendChild(newYear);
    }

    async saveStudyRoutes() {
        const isLoggedIn = window.msalModule.getActiveAccount() !== null;
        if (!isLoggedIn) {
          alert('Please log in to save your study routes.');
          return;
        }
      
        const studyRouteName = this.shadowRoot.getElementById('studyRouteName').value;
        if (!studyRouteName) {
          alert('Please enter a name for the study route.');
          return;
        }
      
        const token = await window.msalModule.acquireTokenSilent();
        const container = this.shadowRoot.getElementById('school-career');
      
        // Maintain a map of existing semesters to avoid duplication
        const existingSemesterMap = new Map(this.existingSemesters);
      
        const newSemesters = Array.from(container.querySelectorAll('leerroute-year')).flatMap(year =>
          Array.from(year.shadowRoot.querySelectorAll('.semester-chooser')).flatMap(semesterChooser =>
            Array.from(semesterChooser.querySelectorAll('module-card')).map(module => {
              const semesterId = parseInt(module.getAttribute('data-semester-id') || 0, 10);
              const semesterData = {
                id: semesterId,
                semester: parseInt(semesterChooser.getAttribute('semester'), 10),
                moduleId: parseInt(module.getAttribute('moduleid'), 10),
                schoolYearId: parseInt(year.getAttribute('year'), 10), // Adjust as needed to map to the correct SchoolYearId
                studyrouteId: this.currentStudyRouteId || 0 // Use currentStudyRouteId if available, otherwise 0 for new routes
              };
      
              // If semester already exists, update the map
              if (existingSemesterMap.has(semesterId)) {
                existingSemesterMap.set(semesterId, semesterData);
              } else {
                // Add new semester to the map
                existingSemesterMap.set(semesterId, semesterData);
              }
      
              return semesterData;
            })
          )
        );
      
        // Remove the module and schoolYear objects
        const studyrouteSemesters = Array.from(existingSemesterMap.values()).map(semester => ({
          id: semester.id,
          semester: semester.semester,
          moduleId: semester.moduleId,
          schoolYearId: semester.schoolYearId,
          studyrouteId: semester.studyrouteId
        }));
      
        let studyRouteData = {
          id: this.currentStudyRouteId, // Include the ID if updating an existing route
          name: studyRouteName,
          studyrouteSemesters
        };
      
        if (studyRouteData.id === null) {
          delete studyRouteData.id;
        }
      
        await ApiService.saveStudyRoute(token, studyRouteData);
        alert('Study routes saved successfully!');
        this.currentStudyRouteId = null; // Reset the ID after saving
      }

    async loadStudyRoute(event) {
        const index = event.target.value;
        if (index === "") {
            this.currentStudyRouteId = null; // Reset the ID when no route is selected
            this.shadowRoot.getElementById('studyRouteName').value = '';
            const modules = JSON.stringify(await ApiService.retrieveModules());
            this.populateYears(modules, false);
            return;
        }

        const container = this.shadowRoot.getElementById('school-career');
        container.innerHTML = '';
        const token = await window.msalModule.acquireTokenSilent();
        const studyRoutes = await ApiService.retrieveStudyRoutes(token);
        const selectedRoute = studyRoutes[index];
        const modules = await ApiService.retrieveModules(token);

        if (selectedRoute && selectedRoute.studyrouteSemesters) {
            this.shadowRoot.getElementById('studyRouteName').value = selectedRoute.name || '';
            this.currentStudyRouteId = selectedRoute.id; // Set the current study route ID for updates

            this.existingSemesters.clear(); // Ensure the map is cleared before populating
            const schoolYears = new Map();

            // Create and add leerroute-year elements for each school year
            selectedRoute.studyrouteSemesters.forEach((semester) => {
                this.existingSemesters.set(semester.id, semester);

                const schoolYearId = semester.schoolYearId;
                let yearElement = schoolYears.get(schoolYearId);

                if (!yearElement) {
                    yearElement = document.createElement('leerroute-year');
                    yearElement.setAttribute('year', schoolYearId);
                    yearElement.setAttribute('modules', JSON.stringify(modules));
                    yearElement.setAttribute('year-title', semester.schoolYear.name);
                    container.appendChild(yearElement);
                    schoolYears.set(schoolYearId, yearElement);
                }

                const module = semester.module;
                if (module) {
                    const moduleCard = document.createElement('module-card');
                    moduleCard.setAttribute('moduleid', module.id);
                    moduleCard.setAttribute('name', module.name);
                    moduleCard.setAttribute('description', module.description);
                    moduleCard.setAttribute('data-semester-id', semester.id);
                    yearElement.addModuleToSemester(moduleCard, semester.semester);
                }
            });

            console.log(schoolYears);
            console.log(this.existingSemesters);
        }

    }

}

if (!customElements.get('study-route-form')) {
    customElements.define('study-route-form', StudyRouteForm);
}
