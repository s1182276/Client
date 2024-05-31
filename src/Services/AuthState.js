class AuthState {
    constructor() {
        this.subscribers = [];
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        if (window.msalModule && typeof window.msalModule.getActiveAccount === 'function') {
            this.isLoggedIn = window.msalModule.getActiveAccount() !== null;
        } else {
            console.error('msalModule is not available or getActiveAccount function is missing.');
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.isLoggedIn));
    }

    setLoggedInState(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        this.notify();
    }

    checkAuthStatus() {
        if (window.msalModule && typeof window.msalModule.getActiveAccount === 'function') {
            const isLoggedIn = window.msalModule.getActiveAccount() !== null;
            if (isLoggedIn !== this.isLoggedIn) {
                this.setLoggedInState(isLoggedIn);
            }
        } else {
            console.error('msalModule is not available or getActiveAccount function is missing.');
        }
    }
}

const authState = new AuthState();
export default authState;
