let currentPage = 'home';
let routeHistory = {};

// { 'routeHistory': { 0: 'home', 1: 'modules' }

const init = (routes = {}) => {
    console.log('Navigation intializing')

    routeHistory = routes;

    console.log('Navigation initialized')
};


const navigateTo = (page) => {
    currentPage = page;
};

export { init, navigateTo };