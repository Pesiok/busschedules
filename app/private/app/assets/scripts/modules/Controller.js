"use strict";

import Router from "../utilis/Router";

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;

        //initialize router
        this.router = new Router();
        this.routerInit();

        //initialize storage
        this.storageInit();
    }

    routerInit() {
         this.router
            .add('/informacje', () => this.view.mainSlider.slide("start"))
            .add('/', () => this.view.mainSlider.slide("reset"))
            .listen()
            .check();
    }

    navigate(path) {
        this.router
            .setState(path)
            .check();
    }

    storageInit() {
        if (localStorage.getItem("favouriteStops")) {
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
            method: "GET",
            headers: new Headers({
                "Content-type": "application/json"
            }),
        }
        const url = `/schedule?stop=${stopNumber}`;

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (saveToModel) this.model.saveSchedule(json, stopNumber);
                    resolve(json);
                })
                .catch(err => {
                    this.view.message("Coś poszło nie tak. Sprawdzenie rozkładu nie powiodło się. Spróbuj później, lub odwiedź oficjalną stronę przewoźnika.", 10000);
                    reject(console.error(err));
                });
        })
    }

    addToFavourites(id = this.model.stopId) {
        if (this.model.favouriteStops.indexOf(id) >= 0) {
            this.view.message("Ten przystanek już jest w twoich ulubionych!");
            return false;
        } else {
            const favStops = this.model.favouriteStops;
            favStops.push(id);

            //saving current state to model and local storage
            this.model.setFavourites(favStops);
            localStorage.setItem("favouriteStops", JSON.stringify(favStops));

            //updating the view
            this.view.renderFavourites();
            this.view.message("Dodano do ulubionych!");
            return true;
        }
    }

    removeFromFavourites(id) {
        if (this.model.favouriteStops.indexOf(id) < 0) {
            this.view.message("Tego przystanku jeszcze nie ma w twoich ulubionych!");

            return false;
        } else {
            const filtredArr = this.model.favouriteStops.filter(element => element !== id);

            //saving current state to model and local storage
            this.model.setFavourites(filtredArr);
            localStorage.setItem("favouriteStops", JSON.stringify(filtredArr));
            this.view.message("Usunięto z ulubionych!");
            
            return true;
        }
    }
}

export default Controller;