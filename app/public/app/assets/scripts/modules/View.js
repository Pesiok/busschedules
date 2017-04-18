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

//initialize slider
const slider = new Slider(selectionSlider, slidesContent);

//temp variables
let chosenCity = null;

//
class View  {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
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
            if (chosenCity) chosenCity.removeEventListener("click", stopHandler);
            //get new city, attach event listener only to stops' container from given city
            this.citySelectionHandler(event);
            chosenCity.addEventListener("click", stopHandler);
        });

        //favourites stops' handlers
        addToFavBtn.addEventListener("click", () => this.controller.addToFavourites());
    }

    stopSelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            const stopNumber = event.target.dataset.value;
            this.controller.requestSchedule(stopNumber)
                .then(this.renderSchedule.bind(this))
                .then(slider.slide("next"));
        }
    }

    citySelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            //hide prev city if there was any
            if (chosenCity) chosenCity.classList.remove("selection__stops--active");
            const value = event.target.dataset.value;
            //get new city
            chosenCity = stopSelection.querySelector(`#${value}`);
            //display only stops from chosen city
            chosenCity.classList.add("selection__stops--active");
            slider.slide("next");
        }
    }

    renderSchedule(schedule = this.model.schedule, container = scheduleContainer) {
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
        container.innerHTML =  `
            <h2>${schedule.stop}</h2>
            <table>
                <tr>
                    <th>Godzina odjazdu</th>
                    <th>Linia</th>
                    <th>Kierunek</th>
                </tr>
                ${departures}
            </table>
        `
    }
    
    renderFavourites() {
        const favs = this.model.favouriteStops;
        console.log(favs);
        
        favs.forEach(id => {
            if (id === this.model.stopId) {
                this.renderSchedule(this.model.schedule, favStopsContainer);
            } else {
                this.controller.requestSchedule(id)
                    .then(this.renderSchedule.bind(this, id, favStopsContainer));
            }
        }, this); 
        
    }
    
    
}

export default View;