import "../Components/Leerroute/Year"
import "../Components/Module/ModuleCard"

export default (() => {
    const render = async () => {
        // Logic before rendering

        return `
<div class="flex-col items-center w-full bg-white rounded-md shadow-md md:p-6 md:w-3/4 lg:w-5/6">
    <div class="mb-4 p-4">
        <label for="input" class="block text-sm font-medium text-gray-700">Leerroute naam</label>
        <input type="text" id="input" name="input" value="Leerroute 1" class="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <hr class="mb-3">
    <div class="flex flex-col items-center w-full">
        <!-- On mobile (sm and below), wrap the divs -->
        <div class="flex flex-col items-center w-full md:flex-row md:justify-center md:flex-wrap">

            <!-- Jaar 1 -->
            <div class="w-full mx-2 p-6 bg-gray-200 rounded-lg m-3 md:w-2/5 md:space-x-2 lg:w-2/5">
                <h5 class="text-xl font-bold mb-4">Jaar 1</h5>

                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-1-1">
                    <b>Semester 1</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-1-2">
                    <b>Semester 2</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
            </div>

            <!-- Jaar 2 -->
            <div class="w-full mx-2 p-6 bg-gray-200 rounded-lg m-3 md:w-2/5 md:space-x-2 lg:w-2/5">
                <h5 class="text-xl font-bold mb-4">Jaar 2</h5>

                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-2-12">
                    <b>Semester 1</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-2-2">
                    <b>Semester 2</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
            </div>

            <!-- Jaar 3 -->
            <div class="w-full mx-2 p-6 bg-gray-200 rounded-lg m-3 md:w-2/5 md:space-x-2 lg:w-2/5">
                <h5 class="text-xl font-bold mb-4">Jaar 3</h5>

                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-3-1">
                    <b>Semester 1</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-3-2">
                    <b>Semester 2</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
            </div>

            <!-- Jaar 4 -->
            <div class="w-full mx-2 p-6 bg-gray-200 rounded-lg m-3 md:w-2/5 md:space-x-2 lg:w-2/5">
                <h5 class="text-xl font-bold mb-4">Jaar 4</h5>

                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-4-1">
                    <b>Semester 1</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
                <div class="flex flex-col p-6 mb-8 bg-white rounded-xl hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 semester-chooser" id="semester-chooser-4-2">
                    <b>Semester 2</b>
                    <p>Klik hier om een module te kiezen</p>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal -->
<div id="semesterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden">
    <div class="bg-white p-8 rounded-lg sm:w-full md:w-5/6 xl:w-2/3 max-h-[80%] overflow-y-auto">
        <div class="p-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Module keuze</h2>
                <div class="ml-auto flex">
<!--                    <button id="addBlock" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4">+</button>-->
                    <button id="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Sluit</button>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap -mx-4 justify-evenly" id="blockContainer">
            <!-- Dynamic blocks will be added here -->
        </div>
    </div>
</div>
`;
    };
    const afterRender = () => {
        $('.semester-chooser').on('click', function() {
            const semesterChooser = $(this)[0];

            window.apiModule.retrieveModules().then(() => {
                $("module-card").on('click', function() {
                    addModuleToSemester($(this)[0], semesterChooser);
                    $('#semesterModal').addClass('hidden');
                    $("#blockContainer").empty()
                });

                $("#semesterModal").removeClass('hidden');
            });
        });

        $('#closeModal').click(() => {
            $('#semesterModal').addClass('hidden');
            $("#blockContainer").empty()
        });

        $(document).mouseup((e) => {
            let modal = $('#semesterModal');
            if (!modal.is(e.target) && modal.has(e.target).length === 0) {
                modal.addClass('hidden');
            }
        });
    };

    const addModuleToSemester = ($module, $semesterChooser) => {
        console.log($module);
        $($semesterChooser).empty();
        $($module).removeClass(); //TODO Make this not needed, improve css
        $semesterChooser.append($module);
    };

    return { render, afterRender };
})();