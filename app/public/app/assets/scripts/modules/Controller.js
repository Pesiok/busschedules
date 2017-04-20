"use strict";

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        this.storageInit();
    }

    storageInit() {
        if (!localStorage.getItem("favouriteStops")) {
            //create new array in localStorage
            const favStops = [];
            favStops.push("null");
            localStorage.setItem("favouriteStops", JSON.stringify(favStops));
        } else {
            const favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
            //get array from localStorage and update the view
            favStopsArr
                .filter(element => parseInt(element))
                .map(element => this.model.saveToFavourites(element));
        }
    }

    requestSchedule(stopNumber, saveToModel = true) {
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

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (saveToModel) this.model.saveSchedule(json, stopNumber);
                    resolve(json);
                })
                .catch(err => reject(console.error(err)));
        })
    }

    addToFavourites() {
        const currentId = this.model.stopId;
        //accessing localStorage
        const favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
        //check if it already is in favs
        // !!!
        favStopsArr.push(currentId);
        localStorage.setItem("favouriteStops", JSON.stringify(favStopsArr));
        //saving current state to model
        this.model.saveToFavourites(currentId);
        //updating the view
        this.view.renderFavourites();
        
    }

    removeFromFavourites(id) {
        const favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
        //remove element from the array

    }
}

export default Controller;