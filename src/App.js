import * as Navigator from './Modules/NavigationManager'

window.navigationManager = Navigator

window.addEventListener("popstate", window.navigationManager.router);
window.addEventListener("DOMContentLoaded", window.navigationManager.router);
