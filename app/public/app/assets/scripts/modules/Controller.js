"use strict";

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;
    }

    requestSchedule(stopNumber) {
        const options = {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json"
            }),
            body: JSON.stringify({
                stop: stopNumber
            }), 
        }
        const url = "/schedule";

        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                this.model.saveSchedule(json, stopNumber);
                this.view.renderSchedule();
            })
            .catch(err => console.error(err));
        
    }

    addToFavorites() {
        console.log("hello from controller");
    }
}

export default Controller;