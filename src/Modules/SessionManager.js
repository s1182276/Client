import {SESSION_NAME} from "../app.config";

let routes;

const loadRoutes = () => {
    routes = localStorage.getItem(SESSION_NAME + "_routes")
    if(routes === null) {
        return [];
    } else {
        return JSON.parse(routes);
    }
}

const storeRoutes = (newRoutes) => {
    localStorage.setItem(SESSION_NAME + "_routes", JSON.stringify(newRoutes))
}

const authenticate = (username, password) => {
    // Login api call
}

export { loadRoutes, authenticate }