import { PublicClientApplication } from "@azure/msal-browser";
import { AZURE_AD } from "../app.config";

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
}

const acquireTokenSilent = async () => {
    let tokenResult = await msalInstance.acquireTokenSilent(loginRequest);
    return tokenResult.accessToken;
}

const trySso = async () => {
    try {
        let authResult = await msalInstance.ssoSilent(loginRequest);
        msalInstance.setActiveAccount(authResult.account);
        return true;
    } catch (e) {
        return false;
    }
}

export { init, getActiveAccount, signIn, signOut, acquireTokenSilent }