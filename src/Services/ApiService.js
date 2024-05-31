import { API_URL } from "../app.config";

const ApiService = (() => {
    const retrieveModules = async (token) => {
        try {
            const response = await fetch(`${API_URL}/SchoolModule`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error retrieving modules:', error);
            return [];
        }
    };

    const retrieveStudyRoutes = async (token) => {
        try {
            const response = await fetch(`${API_URL}/StudyRoute`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error retrieving study routes:', error);
            return [];
        }
    };

    const saveStudyRoute = async (token, studyRouteData) => {
        const method = studyRouteData.id ? 'PUT' : 'POST';
        const url = studyRouteData.id ? `${API_URL}/StudyRoute/${studyRouteData.id}` : `${API_URL}/StudyRoute`;
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studyRouteData)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error ${method === 'POST' ? 'creating' : 'updating'} study route:`, error);
        }
    };

    return { retrieveModules, retrieveStudyRoutes, saveStudyRoute };
})();

export default ApiService;
