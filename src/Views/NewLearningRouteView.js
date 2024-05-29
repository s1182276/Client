import "../Components/Leerroute/Year"
import "../Components/Module/ModuleCard"
import "../Components/Module/ModuleInfo"

export default (() => {
    const render = async () => {
        // Logic before rendering

        return `
        <div class="flex-col items-center w-full bg-white rounded-md shadow-md md:p-6 md:w-3/4 lg:w-5/6 schoolYear">

        <div class="flex flex-col items-center w-full">
            <!-- On mobile (sm and below), wrap the divs -->
            <div class="flex flex-col items-center w-full md:flex-row md:justify-center md:flex-wrap ">
                <div id="school-career">
                    <leerroute-year class="m-4" year="1"></leerroute-year>
                    <leerroute-year class="m-4" year="2"></leerroute-year>
                    <leerroute-year class="m-4" year="3"></leerroute-year>
                    <leerroute-year class="m-4" year="4"></leerroute-year>
                </div>
                
                 <button id="addYearBtn" class="rounded-full py-2 px-4">Voeg schooljaar toe</button>
            </div>
        </div>
    </div>
`;
    };
    const afterRender = () => {


        function addYear() {
            const container = document.getElementById('school-career');
            const currentYears = container.querySelectorAll('leerroute-year').length;
            const newYear = document.createElement('leerroute-year');
            newYear.setAttribute('year', currentYears + 1);
            console.log(newYear.year);
            container.appendChild(newYear);
        }

        document.getElementById('addYearBtn').addEventListener('click', addYear); 
    };

    return { render, afterRender };
})();