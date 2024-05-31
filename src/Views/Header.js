import { MenuButton } from "../Classes/MenuButton";
import authState from '../Services/AuthState';
import { AppUserRole } from "../Enums/AppUserRole";
import { hasFlag } from "../Helpers/FlagHelper";

export default (() => {
    const buttonClasses = 'text-white py-2 px-4 hover:bg-gray-800 cursor-pointer';

    const buttonsLoggedIn = [
        new MenuButton("logout-button", "Uitloggen", () => {
            window.msalModule.signOut().then(() => {
                authState.checkAuthStatus();
            });
        }),
    ];

    const buttonsStudent = [
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

    const buttonsAdministator = [
        new MenuButton("admin-button", "Beheer", () => {
            window.location.href = ADMIN_PORTAL_URI;
        }),
    ]

    const buttonsStudentSupervisor = [
        new MenuButton("my-students-button", "Mijn studenten", () => {
            // TODO created this button just to test functionality
        })
    ]

    const buttonsGuest = [
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

    const redrawMenu = () => {
        let buttons = [];

        let isLoggedIn = window.msalModule.getActiveAccount() != null;
        if(isLoggedIn) {
            window.apiModule.getCurrentUser().then((user) => {
                if(user.isFirstSignIn){
                    // Prompt users to fill in their study progress on first sign in
                    redirectTo("mijn-studievoortgang");
                }

                $('#menu-header').text(user.displayName);

                buttons.push(...buttonsLoggedIn);

                if(hasFlag(user.appUserRole, AppUserRole.Student)){
                     buttons.push(...buttonsStudent);
                }

                if(hasFlag(user.appUserRole, AppUserRole.StudentSupervisor)){
                    buttons.push(...buttonsStudentSupervisor);
                }

                if(hasFlag(user.appUserRole, AppUserRole.Administrator)){
                    buttons.push(...buttonsAdministator);
                }

                drawButtons(buttons);
            });
        }
        else {
            buttons.push(...buttonsGuest);
            buttons.push(...buttonsCommon);

            drawButtons(buttons);
        }
    }

    const drawButtons = (buttons) => {
        $('#menu-buttons').empty();
        buttons.forEach(button => drawButton(button));
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
            <header id="header" class="HomeHeader p-4">
                <div class="flex justify-between items-center">
                    <h1 id="header-text" class="text-xl text-white hover:cursor-pointer">Deeltijd Keuzewijzer</h1>
                    <button id="menuButton" class="text-white focus:outline-none">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
            <div id="menu" class="fixed top-0 right-0 w-64 h-full HomeHeaderMenu transform translate-x-full transition-transform duration-300 ease-in-out z-50">
                <div class="flex justify-between items-center py-4 text-white px-4">
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

        $('#header-text').on('click', () => {
            redirectTo("");
        })

        redrawMenu();
    }

    return { render, afterRender };
})();
