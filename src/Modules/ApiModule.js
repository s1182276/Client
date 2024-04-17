const retrieveLeerroutes = async () => {

    // 1. Load leerroutes   Mocked for now.
    const leerroutes = {'screen_1': 'Hardcoded', 'screen_2': 'Webcomponents', 'screen_3': 'Hardcoded ingevuld',}

    for (const route in leerroutes) {
        const option = $('<option>', {value: route, text: leerroutes[route]})
        navigationManager.getSelector().append(option)
    }
}


export {retrieveLeerroutes}