"use strict";

import Model from "./modules/Model.js";
import View from "./modules/View.js";
import Controller from "./modules/Controller.js";

//DOM elements
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
    backBtns: [...document.querySelectorAll(".selection__button--back")],
    resetBtns: [...document.querySelectorAll(".selection__button--reset")],
    addToFavBtn: document.querySelector(".button--fav"),
    refreshBtn: document.getElementById("refreshBtn"),
    msgBox: document.getElementById("messageBox"),
    removeFromFavBtns: [...document.querySelectorAll(".schedule__button--remove")]
}

const init = function() {
    const model = new Model();
    const controller = new Controller();
    const view = new View(model, controller, elements);

    controller.initialize(model, view);
};

document.addEventListener("DOMContentLoaded", init);