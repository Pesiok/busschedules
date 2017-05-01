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
const refreshBtn = document.getElementById("refreshBtn");
const msgBox = document.getElementById("messageBox");
let removeFromFavBtns = [...document.querySelectorAll(".button--remove")];

//initialize slider
const slider = new Slider(selectionSlider, slidesContent);

class View  {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        //temp variables
        this.chosenCity = null;
        this.msgTimeoutIds = [];
        //removeFavBtnHandler reference
        this.removeFav = this.removeFromFavHandler.bind(this);
        //initialize main events
        this.events()
    }

    events() {
        //slider handlers//
        startBtn.addEventListener("click", () => slider.slide("next"));
        backBtns.forEach(element => element.addEventListener("click", () => slider.slide("prev")));
        resetBtns.forEach(element => element.addEventListener("click", () => slider.slide("reset")));

        //selection handlers//
        const stopHandler = this.stopSelectionHandler.bind(this);
        citySelectionBtns.addEventListener("click", event => {
            //remove old listener if there was any
            if (this.chosenCity) this.chosenCity.removeEventListener("click", stopHandler);
            //get new city, attach event listener only to stops' container from given city
            this.citySelectionHandler(event);
            this.chosenCity.addEventListener("click", stopHandler);
        });

        //fav handlers//
        addToFavBtn.addEventListener("click", this.addToFavHandler.bind(this));
        this.updateRemoveFavBtnsListeners();

        //refresh handler//
        refreshBtn.addEventListener("click", this.renderFavourites.bind(this));
        
    }
    updateRemoveFavBtnsListeners() {
        //called whenever new remove btn is added
        removeFromFavBtns = [...document.querySelectorAll(".button--remove")];

        if (removeFromFavBtns.length > 0) {
            removeFromFavBtns.forEach(element => element.addEventListener("click", this.removeFav));
        }
    }

    addToFavHandler(event) {
        const btn = event.target;
        if (this.controller.addToFavourites()) {
            //success animation!!!
        } else {
            //failure animation!!!
        }
    }

    removeFromFavHandler(event) {
        const id = event.target.dataset.value;
        const btn = event.target;

        if (this.controller.removeFromFavourites(id)) {
            //remove old listener if action is valid
            btn.removeEventListener("click", this.removeFav);
            //remove schedule with that id from the DOM
            const schedule = document.querySelector(`#favStops #stop-${id}`);
            schedule.parentNode.removeChild(schedule);
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

    stopSelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            const id = event.target.dataset.value;
        
            this.controller.requestSchedule(id)
                .then(this.renderSchedule.bind(this))
                .then(this.displaySchedule.bind(this))
                .catch(err => console.error(err));
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

    displaySchedule(htmlString, container = scheduleContainer) {
        container.innerHTML = htmlString;
        slider.slide("next");
        this.updateRemoveFavBtnsListeners()
    }

    displayFavourites(schedules, container = favStopsContainer) {
        let htmlString = "";
        schedules.forEach(schedule => htmlString += schedule);

        if (htmlString.length > 0) {
            container.innerHTML = htmlString;
            this.updateRemoveFavBtnsListeners();
        } else {
            container.innerHTML = `
            <p>Brak ulubionych przystanków do wyświetlenia.</p>
            <p>Dodaj przystanki do ulubionych by mieć je pod ręką klikając "dodaj do ulubonych" przy wybranym przystanku.</p>
            <p>Ulubione przystanki są zapisywane lokalnie w pamięcie przeglądarki danego urządzenia aż do jej wyczyszczenia.</p>
            `
        }
        
    }
    
    renderFavourites() {
        const favs = this.model.favouriteStops;
        
        //request schedule for each stop id in favourites
        Promise.all(favs.map(id => this.controller.requestSchedule(id, false)
                        .then(json => this.renderSchedule(json, id))))
            .then(this.displayFavourites.bind(this))
            .catch(err => console.error(err));
    }

    message(msg, timeout = 2000) {
        msgBox.innerHTML = msg;
        //clearing last timeouts
        this.msgTimeoutIds.map(timeoutId => clearTimeout(timeoutId));
        //show msg
        msgBox.classList.add('message-box--active');
        const id1 = setTimeout(() => msgBox.classList.add('message-box--show'), 150);
        //remove msg after timeout
        const id2 = setTimeout(() => msgBox.classList.remove('message-box--show'), timeout);
        const id3 = setTimeout(() => msgBox.classList.remove('message-box--active'), timeout + 150);
        //saving id's
        this.msgTimeoutIds.push(id1, id2, id3);
    }
}

export default View;