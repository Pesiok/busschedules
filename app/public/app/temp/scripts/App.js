/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: "initialize",
        value: function initialize(model, view) {
            this.model = model;
            this.view = view;
        }
    }, {
        key: "requestSchedule",
        value: function requestSchedule(stopNumber) {
            var _this = this;

            var options = {
                method: "POST",
                headers: new Headers({
                    "Content-type": "application/json"
                }),
                body: JSON.stringify({
                    stop: stopNumber
                })
            };
            var url = "/schedule";

            fetch(url, options).then(function (response) {
                return response.json();
            }).then(function (json) {
                _this.model.saveSchedule(json, stopNumber);
                _this.view.renderSchedule();
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "addToFavorites",
        value: function addToFavorites() {
            console.log("hello from controller");
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//private variables

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var priv = new WeakMap();
var _ = function _(instance) {
    return priv.get(instance);
};

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        var privateMembrs = {
            schedule: {},
            stopId: 0,
            favStops: [],
            maxFavStops: 10
        };
        priv.set(this, privateMembrs);
    }

    _createClass(Model, [{
        key: "saveSchedule",
        value: function saveSchedule(json, id) {
            _(this).schedule = json;
            _(this).stopId = id;
        }
    }, {
        key: "saveToFavourites",
        value: function saveToFavourites(id) {
            _(this).stopId.push(id);
        }
    }, {
        key: "schedule",
        get: function get() {
            return _(this).schedule;
        }
    }, {
        key: "stopId",
        get: function get() {
            return _(this).stopId;
        }
    }]);

    return Model;
}();

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Slider = __webpack_require__(4);

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var slider = new _Slider2.default();

//elements
var startSelection = document.getElementById("startSelection");
var citySelection = document.getElementById("citySelection");
var citySelectionBtns = document.getElementById("citySelectionBtns");
var stopSelection = document.getElementById("stopSelection");
var scheduleContainer = document.getElementById("schedule");
var startBtn = document.getElementById("startSelectionBtn");
var backBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--back")));
var resetBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--reset")));
var addToFavBtn = document.querySelector(".button--fav");
//temp varibles
var chosenCity = null;

function citySelectionHandler(event) {
    if (event.target && event.target.matches("button")) {
        //hide prev city if there was any
        if (chosenCity) chosenCity.classList.remove("selection__stops--active");
        var value = event.target.dataset.value;
        //get new city
        chosenCity = stopSelection.querySelector("#" + value);
        //display only stops from chosen city
        chosenCity.classList.add("selection__stops--active");
        slider.slide("next");
    }
}

function stopSelectionHandler(event) {
    if (event.target && event.target.matches("button")) {
        var stopNumber = event.target.dataset.value;
        this.controller.requestSchedule(stopNumber);
        slider.slide("next");
    }
}

var View = function () {
    function View(model, controller) {
        _classCallCheck(this, View);

        this.model = model;
        this.controller = controller;
        //initialize main events
        this.events();
    }

    _createClass(View, [{
        key: "events",
        value: function events() {
            //slider buttons
            startBtn.addEventListener("click", function () {
                return slider.slide("next");
            });
            backBtns.forEach(function (element) {
                return element.addEventListener("click", function () {
                    return slider.slide("prev");
                });
            });
            resetBtns.forEach(function (element) {
                return element.addEventListener("click", function () {
                    return slider.slide("reset");
                });
            });

            //stop selection handlers
            var stopHandler = stopSelectionHandler.bind(this);
            citySelectionBtns.addEventListener("click", function (event) {
                //remove old listener if there was any
                if (chosenCity) chosenCity.removeEventListener("click", stopHandler);
                //get new city, attach event listener only to stops' container from given city
                citySelectionHandler(event);
                chosenCity.addEventListener("click", stopHandler);
            });

            //favourites stops' handlers
            //addToFavBtn.addEventListener("click", this.controller.addToFavourites);
        }
    }, {
        key: "renderSchedule",
        value: function renderSchedule() {
            var schedule = this.model.schedule;
            var container = scheduleContainer;
            var departures = "";

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = schedule.departures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var departure = _step.value;

                    departures += "\n            <tr>\n                <td>" + departure.time + "</td>\n                <td>" + departure.line + "</td>\n                <td>" + departure.destination + "</td>\n            </tr>\n                ";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            container.innerHTML = "\n            <h2>" + schedule.stop + "</h2>\n            <table>\n                <tr>\n                    <th>Godzina odjazdu</th>\n                    <th>Linia</th>\n                    <th>Kierunek</th>\n                </tr>\n                " + departures + "\n            </table>\n        ";
        }
    }]);

    return View;
}();

exports.default = View;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Model = __webpack_require__(1);

var _Model2 = _interopRequireDefault(_Model);

var _View = __webpack_require__(2);

var _View2 = _interopRequireDefault(_View);

var _Controller = __webpack_require__(0);

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
    var model = new _Model2.default();
    var controller = new _Controller2.default();
    var view = new _View2.default(model, controller);

    controller.initialize(model, view);
}; //import SelectStop from './modules/SelectStop.js';
//const selectStop = new SelectStop();

document.addEventListener("DOMContentLoaded", init);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//elements

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var selectionSlider = document.querySelector(".selection__slider");
var slideContents = [].concat(_toConsumableArray(document.querySelectorAll(".selection__content")));
//variables
var translated = 0;
var slideCounter = 0;

var Slider = function () {
    function Slider() {
        var translateValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;

        _classCallCheck(this, Slider);

        this.translateValue = translateValue;
    }

    _createClass(Slider, [{
        key: "slide",
        value: function slide(value) {
            var currentSlide = slideContents[slideCounter];
            var nextSlide = slideContents[slideCounter + 1];
            var prevSlide = slideContents[slideCounter - 1];

            switch (value) {
                case "next":
                    {
                        translated -= this.translateValue;
                        nextSlide.classList.add("selection__content--active");
                        currentSlide.classList.remove("selection__content--active");
                        slideCounter++;
                    }
                    break;
                case "prev":
                    {
                        translated += this.translateValue;
                        prevSlide.classList.add("selection__content--active");
                        currentSlide.classList.remove("selection__content--active");
                        slideCounter--;
                    }
                    break;
                case "reset":
                    {
                        translated = 0;
                        slideCounter = 0;
                        slideContents.forEach(function (element, index) {
                            if (index == 0) {
                                element.classList.add("selection__content--active");
                            } else {
                                element.classList.remove("selection__content--active");
                            }
                        });
                    }
            }

            selectionSlider.style.transform = "translateX(" + translated + "%)";
        }
    }]);

    return Slider;
}();

exports.default = Slider;

/***/ })
/******/ ]);