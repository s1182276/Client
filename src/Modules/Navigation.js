import ViewEngine from "./ViewEngine.js";

(() => {

    currentPage: '2';

    init: () => {
        console.log('Navigation intializing')

        ViewEngine.init(this.currentPage)

        console.log('Navigation initialized')
    };

    navigateTo: (page) => {

    };

    return {
        init:init,
        navigateTo:navigateTo,
        getCurrentPage: () => this.currentPage
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
})()


export default Navigation;