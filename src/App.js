/* globals window */

import navigationManager from './Modules/NavigationManager';
import apiModule from "./Modules/ApiModule";
import msalModule from "./Modules/MsalModule";

window.navigationManager = navigationManager("root");
window.msalModule = msalModule();
window.apiModule = apiModule();

window.addEventListener('DOMContentLoaded', () => window.navigationManager.renderPage());
window.addEventListener('hashchange', () => window.navigationManager.renderContent());
