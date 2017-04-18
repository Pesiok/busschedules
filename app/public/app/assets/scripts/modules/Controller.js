"use strict";

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.storageInit();
    }

    storageInit() {
        if (!localStorage.favouriteStops) {
            localStorage.favouriteStops = [];
        }
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
        // ?????????????????????????????
        return new Promise((resolve, reject) => {
            fetch(url, options)
            .then(response => response.json())
            .then(json => {
            
                resolve(() => this.model.saveSchedule(json, stopNumber));
            })
            .catch(err => reject(console.error(err)));
        })
    }

    addToFavourites() {
        console.log("adding to favs!")
        const currentId = this.model.stopId;
        //adding to local storage
        localStorage.favouriteStops.push(currentId);
        //saving current state to model
        this.model.saveToFavourites(currentId);
        //updating the view
        this.view.renderFavourites();
        
    }
}

export default Controller;