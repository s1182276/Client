let navigationSelector;
const HOME_PAGE = 'screen_1'

const init = (selector) => {
    navigationSelector = $(selector)
}

const getSelector = () => {
    return navigationSelector
}

/**
 * Navigate to another screen
 * @param screenName screen name to navigate to
 */
const to = (screenName = '') => {

    // 1. Validate screen name parameter
    if (screenName === '')
        return

    // 2. Set the new screen as current route
    localStorage.setItem('route', screenName)

    // 3. Remove old screen and replace
    $('#app').empty().load(`views/${screenName}.html`)

    // 4. Update Route selector
    getSelector().val(screenName)
}

/**
 * Retrieve the current route
 * @returns {string}
 */
const currentRoute = () => {
    let storedRoute = localStorage.getItem('route')
    if (storedRoute === null) {
        storedRoute = HOME_PAGE
    }
    return storedRoute
}

export {init, getSelector, to, currentRoute}