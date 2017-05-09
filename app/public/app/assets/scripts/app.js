"use strict";

import Model from "./modules/Model.js";
import View from "./modules/View.js";
import Controller from "./modules/Controller.js";

document.addEventListener("DOMContentLoaded", () => {
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
        backBtn: document.querySelector(".slider-navigation__button--back"),
        resetBtn: document.querySelector(".slider-navigation__button--reset"),
        addToFavBtn: document.querySelector(".button--fav"),
        refreshBtn: document.getElementById("refreshBtn"),
        msgBox: document.getElementById("messageBox"),
        removeFromFavBtns: [...document.querySelectorAll(".schedule__button--remove")]
    }

    const model = new Model();
    const controller = new Controller();
    const view = new View(model, controller, elements);

    controller.initialize(model, view);
});