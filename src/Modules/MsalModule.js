import { PublicClientApplication } from "@azure/msal-browser";
import { AZURE_AD } from "../app.config";

const msalConfig = {
    auth: {
        clientId: AZURE_AD.ClientId,
        authority: AZURE_AD.Authority,
        redirectUri: AZURE_AD.RedirectUri
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

const loginRequest = {
    scopes: ["user.read", "openid", "profile"],
};

const signIn = async () => {
    try {
        await msalInstance.initialize();
        const authResult = await msalInstance.loginPopup();
        console.log("Authentication successful:", authResult);
        return authResult;
    } catch (error) {
        console.log("Authentication failed:", error);
        return null;
    }
}

const signOut = () => {
    msalInstance.logout();
    console.log("User logged out.");
}

const acquireTokenSilent = async (tokenRequest) => {
    return await msalInstance.acquireTokenSilent(tokenRequest);
}

export { signIn, signOut, acquireTokenSilent }