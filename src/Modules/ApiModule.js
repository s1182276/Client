import * as apiHelper from "../Helpers/ApiHelper"

export default () => {
    const getAllModules = async () => {
        try {
            return await apiHelper.getAsync("schoolmodule")
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    const getCurrentUser = async () => {
        try {
            return await apiHelper.getAsync("appuser");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { getAllModules, getCurrentUser }
}