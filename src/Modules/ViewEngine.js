const ViewEngine = {


    init(view_path = '') {
        if(view_path === '') {
            console.log('Using default Views location: "/resources/Views/"')
        } else {
            console.log(`Using custom views location: ${view_path}`)
        }

        // Done
       console.log('View engine initialized.')
    },

    render() {

        let view = new View()

        console.log('View gerendered')
    }
}

export default ViewEngine;