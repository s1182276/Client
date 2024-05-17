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

const initialize = async () => {
    await msalInstance.initialize();
}

const getActiveAccount = () => {
    return msalInstance.getActiveAccount();
}

const trySso = async () => {
    let authResult = await msalInstance.ssoSilent(loginRequest);
    
    return true;
}

const signIn = async () => {
    try {
        let authResult = await msalInstance.loginPopup();

        msalInstance.setActiveAccount(authResult.account);

        return authResult;
    } catch (error) {
        console.log("Authentication failed:", error);
        return null;
    }
}

const signOut = async () => {
    await msalInstance.logoutPopup();
    console.log("User logged out.");
}

const acquireTokenSilent = async (tokenRequest) => {
    return await msalInstance.acquireTokenSilent(tokenRequest);
}

export { initialize, getActiveAccount, trySso, signIn, signOut, acquireTokenSilent }