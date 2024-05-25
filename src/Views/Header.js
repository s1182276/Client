import { MenuButton } from "../Classes/MenuButton";
import authState from '../Services/AuthState';

export default (() => {
    const buttonClasses = 'text-white py-2 px-4 hover:bg-gray-800 cursor-pointer';

    const buttonsLoggedIn = [
        new MenuButton("logout-button", "Uitloggen", () => {
            window.msalModule.signOut().then(() => {
                authState.checkAuthStatus();
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
                authState.checkAuthStatus();
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
        location.hash = `#/${path}`;
    }

    const redrawMenu = (buttons) => {
        let isLoggedIn = window.msalModule.getActiveAccount() != null;

        const menuHeader = document.getElementById('menu-header');
        if (isLoggedIn && menuHeader) {
            menuHeader.textContent = window.msalModule.getActiveAccount().name;
        }

        if (!buttons) {
            buttons = (isLoggedIn ? buttonsLoggedIn : buttonsLoggedOut).concat(buttonsCommon);
        }

        const menuButtonsContainer = document.getElementById('menu-buttons');
        if (menuButtonsContainer) {
            menuButtonsContainer.innerHTML = ''; // Clear existing buttons
            buttons.forEach(button => drawButton(button, menuButtonsContainer));
        }
    }

    const drawButton = (button, container) => {
        const buttonElement = document.createElement('div');
        buttonElement.className = buttonClasses;
        buttonElement.id = button.id;
        buttonElement.textContent = button.text;
        buttonElement.addEventListener('click', button.action);
        buttonElement.addEventListener('click', () => {
            document.getElementById('menu').classList.toggle('translate-x-full');
        });

        container.appendChild(buttonElement);
    }

    const render = () => {
        return `
            <header id="header" class="bg-zinc-800 p-4">
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
                    <div class="flex items-center justify-center">
                        <button id="closeMenuButton" class="text-white focus:outline-none">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div id="menu-header" class="text-lg ml-2">Menu</div>
                    </div>
                </div>
                <div id="menu-buttons"></div>
            </div>
        `;
    };

    const afterRender = () => {
        authState.subscribe((isLoggedIn) => {
            redrawMenu();
            window.navigationManager.renderContent();
        });

        const menu = document.getElementById('menu');
        const menuButton = document.getElementById('menuButton');
        const closeMenuButton = document.getElementById('closeMenuButton');

        if (menuButton) {
            menuButton.addEventListener('click', () => {
                menu.classList.toggle('translate-x-full');
            });
        }

        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', () => {
                menu.classList.toggle('translate-x-full');
            });
        }

        redrawMenu();
    }

    return { render, afterRender };
})();
