import { MenuButton } from '../Classes/MenuButton';

let msalInstance;
let menuContainer;

const buttonClasses = [ 'text-white', 'py-2', 'px-4', 'hover:bg-gray-800', 'cursor-pointer' ];

const buttonsLoggedIn = [
    new MenuButton("logout-button", "Uitloggen", () => {
        msalInstance.signOut().then(() => {
            redrawButtons();
        });
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
        msalInstance.signIn().then(() => {
            redrawMenu();
        });
    }),
]

const buttonsCommon = [
    new MenuButton("feedback-button", "Feedback", () => {

    }),
    new MenuButton("disclaimer-button", "Disclaimer", () => {
        
    }),
]

const init = (container, msal) => {
    console.log("Initializing menu");

    menuContainer = $(container);
    msalInstance = msal;

    getContainer().empty().load('views/menu.html', () => {
        const menu = $('#menu');
        $('#menuButton').on('click', () => {
            menu.toggleClass('translate-x-full');
        });

        $('#closeMenuButton').on('click', () => {
            menu.toggleClass('translate-x-full');
        });

        redrawMenu();
    });
}

const getContainer = () => {
    return menuContainer;
}

const redrawMenu = (buttons) => {

    let isLoggedIn = msalInstance.getActiveAccount() != null;

    if(isLoggedIn) {
        $('#menu-header').text(msalInstance.getActiveAccount().name);
    }

    if(buttons == null) {
        buttons = (isLoggedIn ? buttonsLoggedIn : buttonsLoggedOut).concat(buttonsCommon);
    }

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

export { init, getContainer }