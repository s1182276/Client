import Navigation from "./Modules/Navigation.js";
import {APP_ENV, APP_NAME} from "./app.config.js";


(()=>{

console.log(`Initializing App "${APP_NAME}", met environment: "${APP_ENV}"...`)

Navigation.init();
Navigation.navigateTo('dashboard');
console.log(`Current page:`, Navigation.getCurrentPage())

})()

