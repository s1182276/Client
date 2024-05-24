import "../Components/Leerroute/Year"
import "../Components/Module/ModuleCard"

export default (() => {
    const render = async () => {
        // Logic before rendering

        return `
        <div class="flex-col items-center w-full bg-white rounded-md shadow-md md:p-6 md:w-3/4 lg:w-5/6 schoolYear">

        <div class="flex flex-col items-center w-full">
            <!-- On mobile (sm and below), wrap the divs -->
            <div class="flex flex-col items-center w-full md:flex-row md:justify-center md:flex-wrap ">
                <div id="school-career">
                    <leerroute-year year="1"></leerroute-year>
                    <leerroute-year year="2"></leerroute-year>
                    <leerroute-year year="3"></leerroute-year>
                    <leerroute-year year="4"></leerroute-year>
                </div>
                
                 <button id="addYearBtn" class="rounded-full py-2 px-4">Voeg schooljaar toe</button>
            </div>
        </div>
    </div>
`;
    };
    const afterRender = () => {
       
        // $(document).mouseup((e) => {
        //     let modal = $('#semesterModal');
        //     if (!modal.is(e.target) && modal.has(e.target).length === 0) {
        //         modal.addClass('hidden');
        //     }
        // });

        function addYear() {
            const container = document.getElementById('school-career');
            const currentYears = container.querySelectorAll('leerroute-year').length;
            const newYear = document.createElement('leerroute-year');
            newYear.setAttribute('year', currentYears + 1);
            console.log(newYear);
            container.appendChild(newYear);
        }

        document.getElementById('addYearBtn').addEventListener('click', addYear); 
       
       
        // $('.semester-chooser').on('click', function() {
        //     const semesterChooser = $(this)[0];

        //     window.apiModule.retrieveModules().then(() => {
        //         $("module-card").on('click', function() {
        //             addModuleToSemester($(this)[0], semesterChooser);
        //             $('#semesterModal').addClass('hidden');
        //             $("#blockContainer").empty()
        //         });

        //         $("#semesterModal").removeClass('hidden');
        //     });
        // });

        // $('#closeModal').click(() => {
        //     $('#semesterModal').addClass('hidden');
        //     $("#blockContainer").empty()
        // });

        // $(document).mouseup((e) => {
        //     let modal = $('#semesterModal');
        //     if (!modal.is(e.target) && modal.has(e.target).length === 0) {
        //         modal.addClass('hidden');
        //     }
        // });
    };

    // const addModuleToSemester = ($module, $semesterChooser) => {
    //     console.log($module);
    //     $($semesterChooser).empty();
    //     $($module).removeClass(); //TODO Make this not needed, improve css
    //     $semesterChooser.append($module);
    // };

    return { render, afterRender };
})();