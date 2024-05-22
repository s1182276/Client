import home from '../Views/Home';
import myRoutes from '../Views/MyRoutes';

const routes = {
    "/": {title: "Home", render: home },
    "/mijn-routes": {title: "Home", render: myRoutes },
}

const router = () => {
    let view = routes[location.pathname];

    if (view) {
        document.title = view.title;
        app.innerHTML = view.render();
    } else {
        history.replaceState("", "", "/");
        router();
    }
}

export { router }