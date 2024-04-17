// App constants


// Web components inladen
import "./Components/LoadingOverlay"
import "./Components/Leerroute/Year"

// Navigation koppelen
import * as Navigator from './Modules/NavigationManager'
window.navigationManager = Navigator
navigationManager.init('#route_select')

import * as Api from './Modules/ApiModule'
window.api = Api;