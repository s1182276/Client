import * as Navigation from "./Modules/Navigation.js";
import 'jquery';
import {loadRoutes} from "./Modules/SessionManager";

// Initialize the app
(()=>{

// Navigation stuff
    const navigator = Navigation;

    // 1. SessionManager initializen
    let routes = loadRoutes()
    // 1.1 NavigationRoute inladen indien aanwezig E.G { 'routeHistory': { 0: 'home', 1: 'modules' } }
    navigator.init(routes)

    // 2. NavigationManager initializen met loaded routeHistory
    // 2.1 routes updaten in NavigationManager

    // 3. ViewManager initializen met route
    // 3.1 Renderen?



    // NavigationManager.currentPage = 'home'
    // Controller = Home
    //      HomeController = index()
    //             index() = ViewManager('home.index', [ 'param' => 'val' ])

})()

