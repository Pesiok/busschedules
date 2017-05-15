"use strict";

import Slider from "./Slider"; 

class View  {
    constructor(model, controller, elements) {
        this.model = model;
        this.controller = controller;
        //DOM elements
        this.elements = elements;
        //initialize slider
        const sliderElements = {
            slider: elements.selectionSlider, 
            slides: elements.slidesContent,
            start: elements.startBtn,
            back: elements.backBtn,
            reset: elements.resetBtn
        }
        this.slider = new Slider(sliderElements);
        //temp variables
        this.chosenCity = null;
        this.msgTimeoutIds = [];
        //function references
        this.removeFav = this.removeFromFavHandler.bind(this);
        //initialize main events
        this.events()
    }

    events() {
        //slider nav handlers//
        this.elements.startBtn.addEventListener("click", () => this.slider.slide("start"));
        this.elements.backBtn.addEventListener("click", () => this.slider.slide("prev"));
        this.elements.resetBtn.addEventListener("click", () => this.slider.slide("reset"));

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
            //remove schedule with specified id from the DOM
            const schedule = document.querySelector(`#favStops #stop-${id}`);
            schedule.parentNode.removeChild(schedule);
        }
    }

    citySelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            //hide prev city if there was any
            if (this.chosenCity) this.chosenCity.classList.remove("stops--active");
            const value = event.target.dataset.value;
            //get new city
            this.chosenCity = this.elements.stopSelection.querySelector(`#${value}`);
            //display only stops from chosen city
            this.chosenCity.classList.add("stops--active");
            this.slider.slide("next");
        }
    }

    stopSelectionHandler(event) {
        if (event.target && event.target.matches("button")) {
            const id = event.target.dataset.value;
            //request new Schedule
            this.controller.requestSchedule(id)
                .then(this.renderSchedule.bind(this))
                .then(this.displaySchedule.bind(this))
                .catch(() => {
                    this.displaySchedule(`
                        <p>Nie można było pobrać rozkładów. :<</p>
                        <p>Spróbuj ponownie później lub skorzystaj z oficjalnej strony przewoźnika</p>
                    `);
                });
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
                        class="schedule__button schedule__button--remove material-icons">delete
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

    showSchedules() {
        const schedules = [...document.querySelectorAll(".schedule")];
        const delay = 300;
        let counter = 1;

        //load-in animation witch delay between each element
        schedules.forEach(schedule => {
            schedule.classList.add("schedule--active");
            setTimeout(() => schedule.classList.add("schedule--show"), delay * counter);
            counter++;
        });
    }

    displaySchedule(htmlString, container = this.elements.scheduleContainer) {
        container.innerHTML = htmlString;
        this.slider.slide("next");
        this.updateRemoveFavBtnsListeners()
        this.showSchedules();
    }

    displayFavourites(schedules, htmlString = "", container = this.elements.favStopsContainer) {
        if (schedules) {
            schedules.forEach(schedule => htmlString += schedule)
            if (htmlString.length > 0) {
                //display fav stops
                container.innerHTML = htmlString;
                this.updateRemoveFavBtnsListeners();
                this.showSchedules();
            } else {
                //no fav stops to display
                container.innerHTML = `
                <div class="placeholder">
                    <p class="placeholder__title">Brak ulubionych przystanków do wyświetlenia. </p>
                    <p class="placeholder__info">Dodaj przystanki do ulubionych by mieć je pod ręką klikając w <span class="placeholder__icon material-icons">favorite</span> po wybraniu przystanku.</p>
                </div>
                `
            } 
        } else {
            //custom msg
            container.innerHTML = htmlString;
        }
    }
    
    renderFavourites(array) {
        const favs = this.model.favouriteStops;
        //?????
        console.log(array);
        //request schedule for each stop id in favourites
        Promise.all(favs.map(id => this.controller.requestSchedule(id, false)
                        .then(json => this.renderSchedule(json, id))))
            .then(this.displayFavourites.bind(this))
            .catch(err => {
                console.error(err);
                this.displayFavourites(null, `
                    <div class="placeholder">
                        <p class="placeholder__title">Nie można było pobrać rozkładów.</p>
                        <p class="placeholder__info">Spróbuj ponownie później lub skorzystaj z oficjalnej strony przewoźnika</p>
                    </div>
                `);
            });
    }

    message(msg, timeout = 2000) {
        const msgBox = this.elements.msgBox;

        msgBox.innerHTML = `
            <p><span aria-hidden="true" class="material-icons">info</span>${msg}</p>
        `
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