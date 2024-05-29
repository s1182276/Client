import NavigationManager from "../Modules/NavigationManager";
import "../Components/Leerroute/Year";
import "../Components/Module/ModuleCard";
import ApiService from '../Services/ApiService';
import authState from '../Services/AuthState';
import { createElementWithClasses, createButton, createSelect } from '../Helpers/ElementUtil';

export default (() => {
    let currentStudyRouteId = null; // To keep track of the current study route being edited

    const render = async () => {
        const isLoggedIn = window.msalModule.getActiveAccount() !== null;
        const token = isLoggedIn ? await window.msalModule.acquireTokenSilent() : null;

        let studyRoutes = [];
        let modules = await ApiService.retrieveModules(token);

        if (isLoggedIn) {
            studyRoutes = await ApiService.retrieveStudyRoutes(token);
        }

        const studyRoutesDropdown = isLoggedIn && studyRoutes.length > 0 ? createSelect('studyRoutesDropdown', [
            { value: '', text: 'Select a saved study route' },
            ...studyRoutes.map((route, index) => ({ value: index, text: route.name }))
        ], 'mt-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500').outerHTML : '';

        const initialYearsHtml = `
            <leerroute-year class="m-4" year="1" modules='${JSON.stringify(modules)}'></leerroute-year>
            <leerroute-year class="m-4" year="2" modules='${JSON.stringify(modules)}'></leerroute-year>
            <leerroute-year class="m-4" year="3" modules='${JSON.stringify(modules)}'></leerroute-year>
            <leerroute-year class="m-4" year="4" modules='${JSON.stringify(modules)}'></leerroute-year>
        `;

        const schoolCareerHtml = studyRoutes.length > 0 ? initialYearsHtml : initialYearsHtml;

        const addYearButton = createButton('addYearBtn', 'Voeg schooljaar toe', 'mt-4 rounded-full py-2 px-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50').outerHTML;
        const saveButton = isLoggedIn ? createButton('saveBtn', 'Opslaan', 'mt-4 rounded-full py-2 px-4 bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50').outerHTML : '';

        return `
            <div class="flex-col items-center w-full bg-white rounded-md shadow-md md:p-6 md:w-3/4 lg:w-5/6 schoolYear">
                <div class="flex flex-col items-center w-full">
                    <input id="studyRouteName" type="text" placeholder="Naam van de studieroute" class="mt-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    ${studyRoutesDropdown}
                    <div class="flex flex-col items-center w-full md:flex-row md:justify-center md:flex-wrap" id="school-career">
                        ${schoolCareerHtml}
                    </div>
                    ${addYearButton}
                    ${saveButton}
                </div>
            </div>
        `;
    };

    const addYear = () => {
        const container = document.getElementById('school-career');
        const currentYears = container.querySelectorAll('leerroute-year').length;
        const newYear = document.createElement('leerroute-year');
        newYear.setAttribute('year', currentYears + 1);
        newYear.setAttribute('modules', '[]'); // Assuming modules is an empty array initially
        container.appendChild(newYear);
    };

    const saveStudyRoutes = async () => {
        const isLoggedIn = window.msalModule.getActiveAccount() !== null;
        if (!isLoggedIn) {
            alert('Please log in to save your study routes.');
            return;
        }

        const studyRouteName = document.getElementById('studyRouteName').value;
        if (!studyRouteName) {
            alert('Please enter a name for the study route.');
            return;
        }

        const token = await window.msalModule.acquireTokenSilent();
        const container = document.getElementById('school-career');
        const studyrouteSemesters = Array.from(container.querySelectorAll('leerroute-year')).flatMap(year => 
            Array.from(year.shadowRoot.querySelectorAll('module-card')).map(module => ({
                id: parseInt(module.getAttribute('data-semester-id') || 0, 10), // Use existing id if available, otherwise 0
                semester: parseInt(year.getAttribute('year'), 10),
                moduleId: parseInt(module.getAttribute('moduleid'), 10),
                schoolYearId: parseInt(year.getAttribute('year'), 10), // Adjust as needed to map to the correct SchoolYearId
                studyrouteId: currentStudyRouteId || 0 // Use currentStudyRouteId if available, otherwise 0 for new routes
            }))
        );

        const studyRouteData = {
            id: currentStudyRouteId, // Include the ID if updating an existing route
            name: studyRouteName,
            studyrouteSemesters
        };

        await ApiService.saveStudyRoute(token, studyRouteData);
        alert('Study routes saved successfully!');
        currentStudyRouteId = null; // Reset the ID after saving
    };

    const loadStudyRoute = async (index) => {
        const container = document.getElementById('school-career');
        container.innerHTML = '';
        const token = await window.msalModule.acquireTokenSilent();
        const studyRoutes = await ApiService.retrieveStudyRoutes(token);
        const selectedRoute = studyRoutes[index];
        const modules = await ApiService.retrieveModules(token);

        console.log("Selected Route:", selectedRoute); // Log the selected route for debugging

        if (selectedRoute && selectedRoute.studyrouteSemesters) {
            document.getElementById('studyRouteName').value = selectedRoute.name || '';
            currentStudyRouteId = selectedRoute.id; // Set the current study route ID for updates

            selectedRoute.studyrouteSemesters.forEach((semester, idx) => {
                const yearElement = document.createElement('leerroute-year');
                yearElement.setAttribute('year', semester.schoolYearId); // Adjust to map the correct SchoolYearId
                yearElement.setAttribute('modules', JSON.stringify(modules));
                container.appendChild(yearElement);
                const module = semester.module; // Access the module directly from the semester
                if (module) {
                    const moduleCard = document.createElement('module-card');
                    moduleCard.setAttribute('moduleid', module.id);
                    moduleCard.setAttribute('name', module.name);
                    moduleCard.setAttribute('description', module.description);
                    moduleCard.setAttribute('data-semester-id', semester.id); // Include the semester id for updates
                    yearElement.addModuleToSemester(moduleCard, semester.semester); // Use semester.semester to add the module to the correct semester
                } else {
                    console.warn("No module found for semester:", semester);
                }
            });
        } else {
            console.warn("No studyrouteSemesters found for selected route:", selectedRoute);
        }
    };

    const afterRender = () => {
        document.getElementById('addYearBtn').addEventListener('click', addYear);
        if (window.msalModule.getActiveAccount() !== null) {
            document.getElementById('saveBtn').addEventListener('click', saveStudyRoutes);
            const dropdown = document.getElementById('studyRoutesDropdown');
            if (dropdown) {
                dropdown.addEventListener('change', async (event) => {
                    const index = event.target.value;
                    if (index !== "") {
                        await loadStudyRoute(index);
                    } else {
                        currentStudyRouteId = null; // Reset the ID when no route is selected
                        document.getElementById('studyRouteName').value = '';
                        const container = document.getElementById('school-career');
                        const modules = JSON.stringify(await ApiService.retrieveModules());
                        container.innerHTML = `
                            <leerroute-year class="m-4" year="1" modules='${modules}'></leerroute-year>
                            <leerroute-year class="m-4" year="2" modules='${modules}'></leerroute-year>
                            <leerroute-year class="m-4" year="3" modules='${modules}'></leerroute-year>
                            <leerroute-year class="m-4" year="4" modules='${modules}'></leerroute-year>
                        `;
                    }
                });
            }
        }
    };

    authState.subscribe(async (isLoggedIn) => {
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = await render();
            afterRender();
        }
    });

  return { render, afterRender };
})();
