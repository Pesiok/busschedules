"use strict";

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.storageInit();
    }

    storageInit() {
        if (!localStorage.getItem("favouriteStops")) {
            const favStops = [];
            favStops.push("null");
            localStorage.setItem("favouriteStops", JSON.stringify(favStops));
        } else {
            const favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
            
            favStopsArr
                .filter(element => parseInt(element))
                .map(element => this.model.saveToFavourites(element));
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
        console.log(this);
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    this.model.saveSchedule(json, stopNumber)
                    resolve();
                })
                .catch(err => reject(console.error(err)));
        })
    }

    addToFavourites() {
        const currentId = this.model.stopId;
        //adding to local storage
        const favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
        favStopsArr.push(currentId);
        localStorage.setItem("favouriteStops", JSON.stringify(favStopsArr));
        //saving current state to model
        this.model.saveToFavourites(currentId);
        //updating the view
        this.view.renderFavourites();
        
    }
}

export default Controller;