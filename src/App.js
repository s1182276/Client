import navigationManager from './Modules/NavigationManager';
import apiModule from "./Modules/ApiModule";
import msalModule from "./Modules/MsalModule";

window.navigationManager = navigationManager("root");
window.apiModule = apiModule();
window.msalModule = msalModule();

window.addEventListener('DOMContentLoaded', () => window.navigationManager.renderPage());
window.addEventListener('hashchange', () => window.navigationManager.renderContent());
