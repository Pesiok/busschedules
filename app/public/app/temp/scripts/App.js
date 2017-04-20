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

            this.storageInit();
        }
    }, {
        key: "storageInit",
        value: function storageInit() {
            var _this = this;

            if (!localStorage.getItem("favouriteStops")) {
                //create new array in localStorage
                var favStops = [];
                favStops.push("null");
                localStorage.setItem("favouriteStops", JSON.stringify(favStops));
            } else {
                var favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
                //get array from localStorage and update the view
                favStopsArr.filter(function (element) {
                    return parseInt(element);
                }).map(function (element) {
                    return _this.model.saveToFavourites(element);
                });
            }
        }
    }, {
        key: "requestSchedule",
        value: function requestSchedule(stopNumber) {
            var _this2 = this;

            var saveToModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

            return new Promise(function (resolve, reject) {
                fetch(url, options).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    if (saveToModel) _this2.model.saveSchedule(json, stopNumber);
                    resolve(json);
                }).catch(function (err) {
                    return reject(console.error(err));
                });
            });
        }
    }, {
        key: "addToFavourites",
        value: function addToFavourites() {
            var currentId = this.model.stopId;
            //accessing localStorage
            var favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
            //check if it already is in favs
            // !!!
            favStopsArr.push(currentId);
            localStorage.setItem("favouriteStops", JSON.stringify(favStopsArr));
            //saving current state to model
            this.model.saveToFavourites(currentId);
            //updating the view
            this.view.renderFavourites();
        }
    }, {
        key: "removeFromFavourites",
        value: function removeFromFavourites(id) {
            var favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
            //remove element from the array
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

var favStops = [];
var maxFavs = 5;
var schedule = {};
var stopId = null;

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    _createClass(Model, [{
        key: "saveSchedule",
        value: function saveSchedule(json, id) {
            schedule = json;
            stopId = id;
        }
    }, {
        key: "saveToFavourites",
        value: function saveToFavourites(id) {
            favStops.push(id);
        }
    }, {
        key: "favouriteStops",
        get: function get() {
            return favStops;
        }
    }, {
        key: "schedule",
        get: function get() {
            return schedule;
        }
    }, {
        key: "stopId",
        get: function get() {
            return stopId;
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

//DOM elements
var selectionSlider = document.querySelector(".selection__slider");
var slidesContent = [].concat(_toConsumableArray(document.querySelectorAll(".selection__content")));
var startSelection = document.getElementById("startSelection");
var citySelection = document.getElementById("citySelection");
var citySelectionBtns = document.getElementById("citySelectionBtns");
var stopSelection = document.getElementById("stopSelection");
var scheduleContainer = document.getElementById("schedule");
var favStopsContainer = document.getElementById("favStops");
var startBtn = document.getElementById("startSelectionBtn");
var backBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--back")));
var resetBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--reset")));
var addToFavBtn = document.querySelector(".button--fav");
var removeFromFavBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--remove")));

//initialize slider
var slider = new _Slider2.default(selectionSlider, slidesContent);

var View = function () {
    function View(model, controller) {
        _classCallCheck(this, View);

        this.model = model;
        this.controller = controller;
        //temp variable
        this.chosenCity = null;
        //initialize main events
        this.events();
    }

    _createClass(View, [{
        key: "events",
        value: function events() {
            var _this = this;

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

            //selection handlers
            var stopHandler = this.stopSelectionHandler.bind(this);
            citySelectionBtns.addEventListener("click", function (event) {
                //remove old listener if there was any
                if (_this.chosenCity) _this.chosenCity.removeEventListener("click", stopHandler);
                //get new city, attach event listener only to stops' container from given city
                _this.citySelectionHandler(event);
                _this.chosenCity.addEventListener("click", stopHandler);
            });

            //favourite handlers
            addToFavBtn.addEventListener("click", function () {
                return _this.controller.addToFavourites();
            });
            this.updateRemoveFavBtnsListeners();
        }
    }, {
        key: "updateRemoveFavBtnsListeners",
        value: function updateRemoveFavBtnsListeners() {
            var _this2 = this;

            //called whenever new remove btn was added
            removeFromFavBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--remove")));

            if (removeFromFavBtns.length > 0) {
                removeFromFavBtns.forEach(function (element) {
                    return element.addEventListener("click", function (event) {
                        return _this2.removeFromFavHandler(event);
                    });
                });
            }
        }
    }, {
        key: "removeFromFavHandler",
        value: function removeFromFavHandler(event) {
            var id = event.target.dataset.value;
            //const scheduleToRemove = document.getElementById(`stop-${id}`).outerHTML="";
            //err Deleting local variable in strict mode
            // !!!
            //delete scheduleToRemove;
            console.log(id);

            this.controller.removeFromFavourites(id);
        }
    }, {
        key: "stopSelectionHandler",
        value: function stopSelectionHandler(event) {
            if (event.target && event.target.matches("button")) {
                var id = event.target.dataset.value;

                this.controller.requestSchedule(id).then(this.renderSchedule.bind(this)).then(this.displayReqSchedule.bind(this)).catch(function (err) {
                    return console.error(err);
                });
            }
        }
    }, {
        key: "citySelectionHandler",
        value: function citySelectionHandler(event) {
            if (event.target && event.target.matches("button")) {
                //hide prev city if there was any
                if (this.chosenCity) this.chosenCity.classList.remove("selection__stops--active");
                var value = event.target.dataset.value;
                //get new city
                this.chosenCity = stopSelection.querySelector("#" + value);
                //display only stops from chosen city
                this.chosenCity.classList.add("selection__stops--active");
                slider.slide("next");
            }
        }
    }, {
        key: "renderSchedule",
        value: function renderSchedule() {
            var schedule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.model.schedule;
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.model.stopId;

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

            return new Promise(function (resolve) {
                resolve("\n            <div id=\"stop-" + id + "\">\n                <h2>" + schedule.stop + "</h2>\n                <table>\n                    <tr>\n                        <th>Godzina odjazdu</th>\n                        <th>Linia</th>\n                        <th>Kierunek</th>\n                    </tr>\n                    " + departures + "\n                </table>\n                <button data-value=\"" + id + "\" class=\"button button--remove\">Usu\u0144 z ulubionych</button>\n            </div>\n        ");
            });
        }
    }, {
        key: "displayReqSchedule",
        value: function displayReqSchedule(htmlString) {
            var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scheduleContainer;

            container.innerHTML = htmlString;
            slider.slide("next");
            this.updateRemoveFavBtnsListeners();
        }
    }, {
        key: "renderFavourites",
        value: function renderFavourites() {
            var _this3 = this;

            var favs = this.model.favouriteStops;

            favs.forEach(function (id) {
                if (id === _this3.model.stopId) {
                    _this3.renderSchedule(_this3.model.schedule, id);
                } else {
                    _this3.controller.requestSchedule(id, false).then(function (json) {
                        return _this3.renderSchedule(json, id);
                    }).then(_this3.displayFavourites.bind(_this3)).catch(function (err) {
                        return console.error(err);
                    });
                }
            }, this);
        }
    }, {
        key: "displayFavourites",
        value: function displayFavourites(htmlString) {
            var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : favStopsContainer;

            container.insertAdjacentHTML("beforeend", htmlString);
            this.updateRemoveFavBtnsListeners();
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
};

document.addEventListener("DOMContentLoaded", init);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//priv variables

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var translated = 0;
var slideCounter = 0;

var Slider = function () {
    function Slider(slider, slides) {
        _classCallCheck(this, Slider);

        this.slider = slider;
        this.slides = slides;
        this.translateValue = 100 / slides.length;
    }

    _createClass(Slider, [{
        key: "slide",
        value: function slide(value) {
            var currentSlide = this.slides[slideCounter];
            var nextSlide = this.slides[slideCounter + 1];
            var prevSlide = this.slides[slideCounter - 1];

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
                        this.slides.forEach(function (element, index) {
                            if (index == 0) {
                                element.classList.add("selection__content--active");
                            } else {
                                element.classList.remove("selection__content--active");
                            }
                        });
                    }
                    break;
                default:
                    {
                        console.log("Incorrect input value");
                    }
            }

            this.slider.style.transform = "translateX(" + translated + "%)";
        }
    }]);

    return Slider;
}();

exports.default = Slider;

/***/ })
/******/ ]);