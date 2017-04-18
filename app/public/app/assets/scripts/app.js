import Model from './modules/Model.js';
import View from './modules/View.js';
import Controller from './modules/Controller.js';

const init = function() {
    const model = new Model();
    const controller = new Controller();
    const view = new View(model, controller);

    controller.initialize(model, view);
};

document.addEventListener("DOMContentLoaded", init);