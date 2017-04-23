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
            //get array from localStorage and update the model
            const filtredArr = favStopsArr.filter(element => parseInt(element));
            this.model.setFavourites(filtredArr);
        }
        //display favourite stops on load
        this.view.renderFavourites();
    }

    requestSchedule(stopNumber, saveToModel = true) {
        console.log("requested new schedule");

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
        
        if (this.model.favouriteStops.indexOf(currentId) >= 0) {
            this.view.message("This stop is already in your favourites");
        } else {
            const favStops = this.model.favouriteStops;
            favStops.push(currentId);
            //saving current state to model and local storage
            this.model.setFavourites(favStops);
            localStorage.setItem("favouriteStops", JSON.stringify(favStops));
            //updating the view
            this.view.renderFavourites();
        }
        
    }

    removeFromFavourites(id) {
        if (this.model.favouriteStops.indexOf(id) < 0) {
            this.view.message("This stop is not yet in your favourites");
        } else {
            const filtredArr = this.model.favouriteStops.filter(element => element !== id);
            //saving current state to model and local storage
            this.model.setFavourites(filtredArr);
            localStorage.setItem("favouriteStops", JSON.stringify(filtredArr));
            //updating the view
            this.view.renderFavourites();
        }
    }
}

export default Controller;