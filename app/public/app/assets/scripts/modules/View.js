"use strict";

import Slider from './Slider';

//DOM elements
const selectionSlider = document.querySelector(".selection__slider");
const slidesContent = [...document.querySelectorAll(".selection__content")];
const startSelection = document.getElementById("startSelection");
const citySelection = document.getElementById("citySelection");
const citySelectionBtns = document.getElementById("citySelectionBtns");
const stopSelection = document.getElementById("stopSelection");
const scheduleContainer = document.getElementById("schedule");
const favStopsContainer = document.getElementById("favStops");
const startBtn = document.getElementById("startSelectionBtn");
const backBtns = [...document.querySelectorAll(".button--back")];
const resetBtns = [...document.querySelectorAll(".button--reset")];
const addToFavBtn = document.querySelector(".button--fav");
let removeFromFavBtns = [...document.querySelectorAll(".button--remove")];

//initialize slider
const slider = new Slider(selectionSlider, slidesContent);

class View  {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        //temp variable
        this.chosenCity = null;
        //initialize main events
        this.events()
    }

    events() {
        //slider buttons
        startBtn.addEventListener("click", () => slider.slide("next"));
        backBtns.forEach(element => element.addEventListener("click", () => slider.slide("prev")));
        resetBtns.forEach(element => element.addEventListener("click", () => slider.slide("reset")));

        //selection handlers
        const stopHandler = this.stopSelectionHandler.bind(this);
        citySelectionBtns.addEventListener("click", event => {
            //remove old listener if there was any
            if (this.chosenCity) this.chosenCity.removeEventListener("click", stopHandler);
            //get new city, attach event listener only to stops' container from given city
            this.citySelectionHandler(event);
            this.chosenCity.addEventListener("click", stopHandler);
        });

        //favourite handlers
        addToFavBtn.addEventListener("click", () => this.controller.addToFavourites());
        this.updateRemoveFavBtnsListeners()
        
    }
    updateRemoveFavBtnsListeners() {
        //called whenever new remove btn was added
        removeFromFavBtns = [...document.querySelectorAll(".button--remove")];

        if (removeFromFavBtns.length > 0) {
            removeFromFavBtns.forEach(element => element.addEventListener("click", event => this.removeFromFavHandler(event)));
        }
    }

    removeFromFavHandler(event) {
        const id = event.target.dataset.value;
        //const scheduleToRemove = document.getElementById(`stop-${id}`).outerHTML="";
        //err Deleting local variable in strict mode
        // !!!
        //delete scheduleToRemove;
        console.log(id);

        this.controller.removeFromFavourites(id);
    }

    stopSelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            const id = event.target.dataset.value;
        
            this.controller.requestSchedule(id)
                .then(this.renderSchedule.bind(this))
                .then(this.displayReqSchedule.bind(this))
                .catch(err => console.error(err));
        }
    }

    citySelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            //hide prev city if there was any
            if (this.chosenCity) this.chosenCity.classList.remove("selection__stops--active");
            const value = event.target.dataset.value;
            //get new city
            this.chosenCity = stopSelection.querySelector(`#${value}`);
            //display only stops from chosen city
            this.chosenCity.classList.add("selection__stops--active");
            slider.slide("next");
        }
    }
    

    renderSchedule(schedule = this.model.schedule, id = this.model.stopId) {
        let departures = "";
        
        for (let departure of schedule.departures) {
            departures += `
            <tr>
                <td>${departure.time}</td>
                <td>${departure.line}</td>
                <td>${departure.destination}</td>
            </tr>
                `
        }
        return new Promise(resolve => {
            resolve(`
            <div id="stop-${id}">
                <h2>${schedule.stop}</h2>
                <table>
                    <tr>
                        <th>Godzina odjazdu</th>
                        <th>Linia</th>
                        <th>Kierunek</th>
                    </tr>
                    ${departures}
                </table>
                <button data-value="${id}" class="button button--remove">Usuń z ulubionych</button>
            </div>
        `)});
    }

    displayReqSchedule(htmlString, container = scheduleContainer) {
        container.innerHTML = htmlString;
        slider.slide("next");
        this.updateRemoveFavBtnsListeners()
    }
    
    renderFavourites() {
        const favs = this.model.favouriteStops;

        favs.forEach(id => {
            if (id === this.model.stopId) {
                this.renderSchedule(this.model.schedule, id);
            } else {
                this.controller.requestSchedule(id, false)
                    .then(json => this.renderSchedule(json, id))
                    .then(this.displayFavourites.bind(this))
                    .catch(err => console.error(err));
            }
        }, this); 
        
    }

    displayFavourites(htmlString, container = favStopsContainer) {
        container.insertAdjacentHTML("beforeend", htmlString);
        this.updateRemoveFavBtnsListeners()
    }
    
    
}

export default View;