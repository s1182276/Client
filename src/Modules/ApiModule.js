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
    
    const getModuleInfo = async (id) => {
        try {
            return await apiHelper.getAsync("schoolmodule", id)
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    const getCurrentUser = async () => {
        try {
            let currentUser = await apiHelper.getAsync("appuser");

            return currentUser
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const updateUserStudyProgress = async (ecPoints, startingYear, hasPropedeuse) => {
        try {
            return await apiHelper.putAsync("appuser/study-progress", "", {
                ecPoints: ecPoints,
                startingYear: startingYear,
                hasPropedeuse: hasPropedeuse,
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { getAllModules, getModuleInfo, getCurrentUser, updateUserStudyProgress }
}