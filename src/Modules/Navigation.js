import ViewEngine from "./ViewEngine.js";

(() => {

    init: () => {
        console.log('Navigation intializing')

        ViewEngine.init(this.currentPage)

        console.log('Navigation initialized')
    },
        navigateTo: (page) => {

    }

    // const navigateTo = page => {
    //     this.currentPage = page
    //     console.log(`Navigating to ${page}`)
    // }
    //
    // const goBack = () => {
    //
    // };
    //
    // const getCurrentPage = () => {
    //     return this.currentPage
    // }

    export default {
        init: this.init
    }

})()


export default Navigation;