//a primitive router but it works...

class Router {
    constructor() {
        this.routes = [];
    }

    add(path, handler) {
        this.routes.push({path, handler});

        return this;
    }

    check() {
        const path = window.location.pathname;

        this.routes.forEach(route => {
            if (path === route.path) {
                route.handler();
            }
        });
    }

    setState(path) {
        window.history.pushState(null, null, path);
        
        return this;
    }

    listen() {
        window.addEventListener("popstate", () => {
           this.check();
        });

        return this;
    }


}

export default Router;