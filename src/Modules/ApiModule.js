import {API_URL} from "../app.config";

export default () => {
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
            return $.ajax({
                url: `${API_URL}/schoolmodule`
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    const getModules = () => {
        return $.ajax({
            url: `${API_URL}/schoolmodule`
        });
    }

    return {retrieveLeerroutes, retrieveModules}
}