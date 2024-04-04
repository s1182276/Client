const ViewEngine = {

    init(view_path = '') {
        if(view_path === '') {
            console.log('Using default views location: "/resources/views/"')
        } else {
            console.log(`Using custom views location: ${view_path}`)
        }

        // Done
       console.log('View engine initialized.')
    },

    render(view = '') {
        console.log('View gerendered')
    }
}

export default ViewEngine;