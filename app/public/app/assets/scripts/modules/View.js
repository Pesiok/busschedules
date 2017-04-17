"use strict";

import Slider from './Slider';
const slider = new Slider();

//elements
const startSelection = document.getElementById("startSelection");
const citySelection = document.getElementById("citySelection");
const citySelectionBtns = document.getElementById("citySelectionBtns");
const stopSelection = document.getElementById("stopSelection");
const scheduleContainer = document.getElementById("schedule");
const startBtn = document.getElementById("startSelectionBtn");
const backBtns = [...document.querySelectorAll(".button--back")];
const resetBtns = [...document.querySelectorAll(".button--reset")];
const addToFavBtn = document.querySelector(".button--fav");
//temp varibles
let chosenCity = null;

function citySelectionHandler(event) {
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

function stopSelectionHandler(event) {
    if (event.target && event.target.matches("button")) {
        const stopNumber = event.target.dataset.value;
        this.controller.requestSchedule(stopNumber);
        slider.slide("next");
    }
}

class View {
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

        //stop selection handlers
        const stopHandler = stopSelectionHandler.bind(this);
        citySelectionBtns.addEventListener("click", event => {
            //remove old listener if there was any
            if (chosenCity) chosenCity.removeEventListener("click", stopHandler);
            //get new city, attach event listener only to stops' container from given city
            citySelectionHandler(event);
            chosenCity.addEventListener("click", stopHandler);
        });

        //favourites stops' handlers
        //addToFavBtn.addEventListener("click", this.controller.addToFavourites);
    }

    renderSchedule() {
        const schedule = this.model.schedule;
        const container = scheduleContainer;
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
    
}

export default View;