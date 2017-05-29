"use strict";

import "babel-polyfill";
import "whatwg-fetch";

import Model from "./modules/Model.js";
import View from "./modules/View.js";
import Controller from "./modules/Controller.js";

//element.matches polyfill
//https://developer.mozilla.org/pl/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
}

document.addEventListener("DOMContentLoaded", () => {
    //get main DOM elements
    const elements = {
        selectionSlider: document.querySelector(".selection__slider"),
        slidesContent: [...document.querySelectorAll(".selection__content")],
        startSelection: document.getElementById("startSelection"),
        citySelection: document.getElementById("citySelection"),
        citySelectionBtns: document.getElementById("citySelectionBtns"),
        stopSelection: document.getElementById("stopSelection"),
        scheduleContainer: document.getElementById("schedule"),
        favStopsContainer: document.getElementById("favStops"),
        startBtn: document.getElementById("startSelectionBtn"),
        backBtn: document.getElementById("navBack"),
        resetBtn: document.getElementById("navReset"),
        addToFavBtn: document.getElementById('favBtn'),
        refreshBtn: document.getElementById("refreshBtn"),
        msgBox: document.getElementById("messageBox"),
        removeFromFavBtns: [...document.querySelectorAll(".schedule__button-remove")],
        mainSlider: document.querySelector(".main-slider"),
        mainSliderSlides: [...document.querySelectorAll(".main-slider__content")],
        infoBtn: document.getElementById("infoBtn"),
        mainBack: document.getElementById("mainBack")

    }

    //initialize application
    const model = new Model();
    const controller = new Controller();
    const view = new View(model, controller, elements);
    controller.initialize(model, view);
});