import {API_URL} from "../app.config";

const retrieveLeerroutes = async () => {

    // 1. Load leerroutes   Mocked for now.
    const leerroutes = {'screen_1': 'Hardcoded', 'screen_2': 'Webcomponents', 'screen_3': 'Hardcoded ingevuld',}

    for (const route in leerroutes) {
        const option = $('<option>', {value: route, text: leerroutes[route]})
        navigationManager.getSelector().append(option)
    }
}

const retrieveModules = async () => {
    try {
        const modules = await getModules();

        let container = $('#blockContainer');

        for (const module of modules) {

            let block = $('<module-card>', {
                class: 'box-border flex flex-col p-2 mb-4 sm:w-full sm:mb-6 md:mb-12 md:w-2/5 lg:w-3/12  xl:w-2/12 bg-gray-100 rounded-lg shadow-md hover:cursor-pointer hover:bg-teal-100 transition-colors duration-75 px-4 mx-4',
                moduleid: module.id,
                name: module.name,
                description: module.description,
            });

            container.append(block);
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

const getModules = () => {
    return $.ajax({
        url: `${API_URL}/module`
    });
}


export {retrieveLeerroutes, retrieveModules}