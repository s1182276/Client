import {MenuButton } from "../Classes/MenuButton";

export default (() => {
    const buttonClasses = [ 'text-white', 'py-2', 'px-4', 'hover:bg-gray-800', 'cursor-pointer' ];

    const buttonsLoggedIn = [
        new MenuButton("logout-button", "Uitloggen", () => {
            window.msalModule.signOut().then(() => {
                redrawMenu();
            });
        }),
        new MenuButton("home-button", "Keuzewijzer", () => {
            redirectTo(""); // Home
        }),
        new MenuButton("my-choices-button", "Mijn keuzes", () => {
            redirectTo("mijn-keuzes");
        }),
        new MenuButton("my-progress-button", "Mijn studievoortgang", () => {
            redirectTo("mijn-studievoortgang");
        }),
        new MenuButton("settings-button", "Mijn instellingen", () => {
            redirectTo("instellingen");
        }),
    ];

    const buttonsLoggedOut = [
        new MenuButton("login-button", "Inloggen", () => {
            window.msalModule.signIn().then(() => {
                redrawMenu();
            });
        }),
    ];

    const buttonsCommon = [
        new MenuButton("feedback-button", "Feedback", () => {
            redirectTo("feedback");
        }),
        new MenuButton("disclaimer-button", "Disclaimer", () => {
            redirectTo("disclaimer");
        }),
    ];

    const redirectTo = (path) => {
        location.hash = `${location.hash === '#/' && location.hash !== '#/' ? `/${path}` : `#/${path}`}`;
    }

    const redrawMenu = (buttons) => {
        let isLoggedIn = window.msalModule.getActiveAccount() != null;

        if(isLoggedIn) {
            $('#menu-header').text(window.msalModule.getActiveAccount().name);
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
            .on('click', button.action)
            .on('click', () => $('#menu').toggleClass('translate-x-full'));

        $('#menu-buttons').append(buttonElement);
    }

    const render = () => {
        return `
<header class="bg-zinc-800 p-4">
    <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-white">Deeltijd Keuzewijzer</h1>
        <button id="menuButton" class="text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
</header>

<div id="menu" class="fixed top-0 right-0 w-64 h-full bg-zinc-800 transform translate-x-full transition-transform duration-300 ease-in-out z-50">
    <div class="flex justify-between items-center py-4 bg-zinc-800 text-white px-4">
        <div class="flex items-center justify-center"> <!-- Center button vertically and horizontally -->
            <button id="closeMenuButton" class="text-white focus:outline-none">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div id="menu-header" class="text-lg ml-2">Menu</div> <!-- Added ml-2 for spacing between button and text -->
        </div>
    </div>
    <div id="menu-buttons"></div>
</div>
`;
    };

    const afterRender = () => {
        window.msalModule.onAuthStatusChange.add(() => {
            redrawMenu();
        });

        const menu = $('#menu');
        $('#menuButton').on('click', () => {
            menu.toggleClass('translate-x-full');
        });

        $('#closeMenuButton').on('click', () => {
            menu.toggleClass('translate-x-full');
        });

        redrawMenu();
    }

    return { render, afterRender };
})();