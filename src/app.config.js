export const APP_NAME = 'HBO-Keuzewijzer'
export const APP_ENV = process.env.ENV
export const API_URL = process.env.API_URL
export const SESSION_NAME = 'keuzewijzer'
export const AZURE_AD = {
    ClientId: "api://keuzewijzer",
    Authority: "https://login.microsoftonline.com/9070e006-2666-465b-a071-ec2554c2c527",
    RedirectUri: "http://localhost:8030"
}
