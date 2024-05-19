// Voor css
// npx tailwindcss -i ./src/Css/main.scss -o ./public/dist/css/app.css --watch

// Voor App.js compilatie
// npx webpack

// Web components inladen
import "./Components/LoadingOverlay"
import "./Components/Leerroute/Year"
import "./Components/Module/ModuleCard"

// Navigation koppelen
import * as Navigator from './Modules/NavigationManager'
window.navigationManager = Navigator
window.navigationManager.init('#route_select')

import * as Api from './Modules/ApiModule'
window.api = Api;

import * as Msal from './Modules/MsalModule'
window.msal = Msal;

import * as Menu from './Modules/MenuModule'
window.menu = Menu;

window.msal.init().then(() => {
    $(document).ready(() => {
        window.menu.init('#menu-container', window.msal);

        window.msal.acquireTokenSilent().then((token) => {
            console.log(`token ${token}`);
        });
    })
})

