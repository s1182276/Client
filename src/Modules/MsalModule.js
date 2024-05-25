import { PublicClientApplication } from "@azure/msal-browser";
import { createEvent } from "../Helpers/EventHelper";
import { AZURE_AD } from "../app.config";

export default () => {
    const onAuthStatusChange = createEvent();

    const msalConfig = {
        auth: {
            clientId: AZURE_AD.ClientId,
            authority: AZURE_AD.Authority,
            redirectUri: AZURE_AD.RedirectUri
        },
    };

    const loginRequest = {
        scopes: ["user.read"],
    };

    const tokenRequest = {
        scopes: ["api://keuzewijzer/All"]
    }

    const msalInstance = new PublicClientApplication(msalConfig);;

    const init = async () => {
        await msalInstance.initialize();
        await msalInstance.handleRedirectPromise();

        const accounts = msalInstance.getAllAccounts();
        if(accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
        } else {
            await trySso();
        }
    }

    const getActiveAccount = () => {
        return msalInstance.getActiveAccount();
    }

    const signIn = async () => {
        try {
            let authResult = await msalInstance.loginPopup();
            msalInstance.setActiveAccount(authResult.account);

            onAuthStatusChange();
        } catch (error) {
            console.log("Authentication failed:", error);
            throw error;
        }
    }

    const signOut = async () => {
        await msalInstance.logoutRedirect({
            account: getActiveAccount(),
            postLogoutRedirectUri: window.location
        });

        onAuthStatusChange();
    }

    const acquireTokenSilent = async () => {
        let tokenResult = await msalInstance.acquireTokenSilent({
            ...tokenRequest,
            account: getActiveAccount()
        });
        return tokenResult.accessToken;
    }

    const trySso = async () => {
        try {
            let authResult = await msalInstance.ssoSilent(loginRequest);
            msalInstance.setActiveAccount(authResult.account);
            onAuthStatusChange();
            return true;
        } catch (e) {
            return false;
        }
    }

    init();

    return { onAuthStatusChange, getActiveAccount, signIn, signOut, acquireTokenSilent }
}
