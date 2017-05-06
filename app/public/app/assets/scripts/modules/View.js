"use strict";

import Slider from "./Slider"; 

class View  {
    constructor(model, controller, elements) {
        this.model = model;
        this.controller = controller;
        //DOM elements
        this.elements = elements;
        //initialize slider
        this.slider = new Slider(elements.selectionSlider, elements.slidesContent);
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
        this.elements.startBtn.addEventListener("click", () => this.slider.slide("next"));
        this.elements.backBtns.forEach(element => element.addEventListener("click", () => this.slider.slide("prev")));
        this.elements.resetBtns.forEach(element => element.addEventListener("click", () => this.slider.slide("reset")));

        //selection handlers//
        const stopHandler = this.stopSelectionHandler.bind(this);
        this.elements.citySelectionBtns.addEventListener("click", event => {
            //remove old listener if there was any
            if (this.chosenCity) this.chosenCity.removeEventListener("click", stopHandler);
            //get new city after click on btn
            this.citySelectionHandler(event);
            //if city was clicked, attach event handler
            if (this.chosenCity) this.chosenCity.addEventListener("click", stopHandler);
        });

        //fav handlers//
        this.elements.addToFavBtn.addEventListener("click", this.addToFavHandler.bind(this));
        this.updateRemoveFavBtnsListeners();

        //refresh handler//
        this.elements.refreshBtn.addEventListener("click", this.renderFavourites.bind(this));
        
    }
    updateRemoveFavBtnsListeners() {
        //called whenever new remove btn is added
        this.elements.removeFromFavBtns = [...document.querySelectorAll(".schedule__button--remove")];

        if (this.elements.removeFromFavBtns.length > 0) {
            this.elements.removeFromFavBtns.forEach(element => element.addEventListener("click", this.removeFav));
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
            this.chosenCity = this.elements.stopSelection.querySelector(`#${value}`);
            //display only stops from chosen city
            this.chosenCity.classList.add("selection__stops--active");
            this.slider.slide("next");
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
            <tr class="schedule__row">
                <td>${departure.time}</td>
                <td>${departure.line}</td>
                <td>${departure.destination}</td>
            </tr>
                `
        }
        return new Promise(resolve => {
            resolve(`
            <div id="stop-${id}" class="schedule">
                <div class="schedule__header">
                    <h2 class="schedule__title">${schedule.stop}</h2>
                    <button data-value="${id}" 
                        title="Usuń z ulubionych" 
                        aria-label="Usuń z ulubionych" 
                        class="schedule__button schedule__button--remove">&#9587;
                    </button>
                </div>
                <table class="schedule__table">
                    <tr class="schedule__headings">
                        <th>Odjazd</th>
                        <th>Linia</th>
                        <th>Kierunek</th>
                    </tr>
                    ${departures}
                </table>
            </div>
        `)});
    }

    displaySchedule(htmlString, container = this.elements.scheduleContainer) {
        container.innerHTML = htmlString;
        this.slider.slide("next");
        this.updateRemoveFavBtnsListeners()
    }

    displayFavourites(schedules, container = this.elements.favStopsContainer) {
        let htmlString = "";
        schedules.forEach(schedule => htmlString += schedule);

        if (htmlString.length > 0) {
            container.innerHTML = htmlString;
            this.updateRemoveFavBtnsListeners();
        } else {
            container.innerHTML = `
            <p>Brak ulubionych przystanków do wyświetlenia.</p>
            <p>Dodaj przystanki do ulubionych by mieć je pod ręką klikając "dodaj do ulubonych" po wybraniu przystanku.</p>
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
        const msgBox = this.elements.msgBox;

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