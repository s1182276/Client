import disclaimerView from "../Views/DisclaimerView";
import feedbackView from "../Views/FeedbackView";
import headerView from '../Views/Header'
import homeView from '../Views/HomeView';
import myChoicesView from "../Views/MyChoicesView";
import myStudyProgressView from '../Views/MyStudyProgressView';
import settingsView from "../Views/SettingsView";
import newLearningRouteView from "../Views/NewLearningRouteView";

export default (rootId) => {
    const root = document.getElementById(rootId);

    const routes = {
        "/": homeView,
        "/mijn-keuzes": myChoicesView,
        "/mijn-studievoortgang": myStudyProgressView,
        "/instellingen": settingsView,
        "/feedback": feedbackView,
        "/disclaimer": disclaimerView,
        "/leerroute" : newLearningRouteView,
    }

    async function renderPage() {
        root.insertAdjacentHTML('afterbegin', headerView.render());
        root.insertAdjacentHTML('beforeend', '<div id="content" class="container w-full mx-auto py-8 flex flex-col justify-center items-center min-h-1/2 lg:w-10/12">');
        headerView.afterRender();
        await renderContent();
    }

    async function renderContent() {
        const url = requestURL();
        let page = routes[url] || homeView;
        document.getElementById('content').innerHTML = await page.render();
        page.afterRender();
    }

    function requestURL() {
        const [, resource = ''] = location.hash.slice(1).toLowerCase().split('/');
        return (`/${resource}`);
    }

    return { renderContent, renderPage };
}