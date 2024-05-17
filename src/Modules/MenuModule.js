import * as Msal from './MsalModule';
import { MenuButton } from '../Classes/MenuButton';

let msal = Msal;
let menuContainer;

const buttonClasses = [ 'text-white', 'py-2', 'px-4', 'hover:bg-gray-800', 'cursor-pointer' ];

const buttonsLoggedIn = [
    new MenuButton("logout-button", "Uitloggen", () => {

    }),
    new MenuButton("my-choices-button", "Mijn keuzes", () => {

    }),
    new MenuButton("send-studyroute-button", "Studieroute doorgeven", () => {

    }),
    new MenuButton("settings-button", "Mijn instellingen", () => {

    }),
];

const buttonsLoggedOut = [
    new MenuButton("login-button", "Inloggen", () => {

    }),
]

const buttonsCommon = [
    new MenuButton("feedback-button", "Feedback", () => {

    }),
    new MenuButton("disclaimer-button", "Disclaimer", () => {
        
    }),
]

const initialize = async (container) => {
    console.log("Initializing menu");

    menuContainer = $(container);
    getContainer().empty().load('views/menu.html');
    
    await msal.initialize();

    let isLoggedIn = await msal.trySso();
    redrawButtons((isLoggedIn ? buttonsLoggedIn : buttonsLoggedOut).concat(buttonsCommon));
}

const getContainer = () => {
    return menuContainer;
}

const redrawButtons = (buttons) => {
    $('#menu-buttons').empty();
    buttons.forEach(button => drawButton(button));
}

const drawButton = (button) => {
    let buttonElement = $('<div>')
        .addClass(buttonClasses)
        .attr('id', button.id)
        .text(button.text)
        .on('click', button.action);

    $('#menu-buttons').append(buttonElement);
}

export { initialize, getContainer }