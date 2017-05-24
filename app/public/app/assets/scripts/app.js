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

    const model = new Model();
    const controller = new Controller();
    const view = new View(model, controller, elements);

    controller.initialize(model, view);
});