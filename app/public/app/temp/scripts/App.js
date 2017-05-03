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
            if (localStorage.getItem("favouriteStops")) {
                var favStopsArr = JSON.parse(localStorage.getItem("favouriteStops"));
                //get array from localStorage and update the model
                var filtredArr = favStopsArr.filter(function (element) {
                    return parseInt(element);
                });
                this.model.setFavourites(filtredArr);
            }
            //display favourite stops on load
            //this.view.renderFavourites();
        }
    }, {
        key: "requestSchedule",
        value: function requestSchedule(stopNumber) {
            var _this = this;

            var saveToModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            console.log("requested new schedule");

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
                    if (saveToModel) _this.model.saveSchedule(json, stopNumber);
                    resolve(json);
                }).catch(function (err) {
                    _this.view.message("Couldn't get the shedule, try again later!", 10000);
                    reject(console.error(err));
                });
            });
        }
    }, {
        key: "addToFavourites",
        value: function addToFavourites() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.model.stopId;

            if (this.model.favouriteStops.indexOf(id) >= 0) {
                this.view.message("This stop is already in your favourites!");
                return false;
            } else {
                var favStops = this.model.favouriteStops;
                favStops.push(id);
                //saving current state to model and local storage
                this.model.setFavourites(favStops);
                localStorage.setItem("favouriteStops", JSON.stringify(favStops));
                //updating the view
                this.view.renderFavourites();
                this.view.message("Added to your favourites.");
                return true;
            }
        }
    }, {
        key: "removeFromFavourites",
        value: function removeFromFavourites(id) {
            if (this.model.favouriteStops.indexOf(id) < 0) {
                this.view.message("This stop is not yet in your favourites!");
                return false;
            } else {
                var filtredArr = this.model.favouriteStops.filter(function (element) {
                    return element !== id;
                });
                //saving current state to model and local storage
                this.model.setFavourites(filtredArr);
                localStorage.setItem("favouriteStops", JSON.stringify(filtredArr));
                this.view.message("Removed from favourites!");
                return true;
            }
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
        key: "setFavourites",
        value: function setFavourites(arr) {
            favStops = arr;
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
var backBtns = [].concat(_toConsumableArray(document.querySelectorAll(".selection__button--back")));
var resetBtns = [].concat(_toConsumableArray(document.querySelectorAll(".selection__button--reset")));
var addToFavBtn = document.querySelector(".button--fav");
var refreshBtn = document.getElementById("refreshBtn");
var msgBox = document.getElementById("messageBox");
var removeFromFavBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--remove")));

//initialize slider
var slider = new _Slider2.default(selectionSlider, slidesContent);

var View = function () {
    function View(model, controller) {
        _classCallCheck(this, View);

        this.model = model;
        this.controller = controller;
        //temp variables
        this.chosenCity = null;
        this.msgTimeoutIds = [];
        //removeFavBtnHandler reference
        this.removeFav = this.removeFromFavHandler.bind(this);
        //initialize main events
        this.events();
    }

    _createClass(View, [{
        key: "events",
        value: function events() {
            var _this = this;

            //slider handlers//
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

            //selection handlers//
            var stopHandler = this.stopSelectionHandler.bind(this);
            citySelectionBtns.addEventListener("click", function (event) {
                //remove old listener if there was any
                if (_this.chosenCity) _this.chosenCity.removeEventListener("click", stopHandler);
                //get new city after click on btn
                _this.citySelectionHandler(event);
                //if city was clicked, attach event handler
                if (_this.chosenCity) _this.chosenCity.addEventListener("click", stopHandler);
            });

            //fav handlers//
            addToFavBtn.addEventListener("click", this.addToFavHandler.bind(this));
            this.updateRemoveFavBtnsListeners();

            //refresh handler//
            refreshBtn.addEventListener("click", this.renderFavourites.bind(this));
        }
    }, {
        key: "updateRemoveFavBtnsListeners",
        value: function updateRemoveFavBtnsListeners() {
            var _this2 = this;

            //called whenever new remove btn is added
            removeFromFavBtns = [].concat(_toConsumableArray(document.querySelectorAll(".button--remove")));

            if (removeFromFavBtns.length > 0) {
                removeFromFavBtns.forEach(function (element) {
                    return element.addEventListener("click", _this2.removeFav);
                });
            }
        }
    }, {
        key: "addToFavHandler",
        value: function addToFavHandler(event) {
            var btn = event.target;
            if (this.controller.addToFavourites()) {
                //success animation!!!
            } else {
                    //failure animation!!!
                }
        }
    }, {
        key: "removeFromFavHandler",
        value: function removeFromFavHandler(event) {
            var id = event.target.dataset.value;
            var btn = event.target;

            if (this.controller.removeFromFavourites(id)) {
                //remove old listener if action is valid
                btn.removeEventListener("click", this.removeFav);
                //remove schedule with that id from the DOM
                var schedule = document.querySelector("#favStops #stop-" + id);
                schedule.parentNode.removeChild(schedule);
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
        key: "stopSelectionHandler",
        value: function stopSelectionHandler(event) {
            if (event.target && event.target.matches("button")) {
                var id = event.target.dataset.value;

                this.controller.requestSchedule(id).then(this.renderSchedule.bind(this)).then(this.displaySchedule.bind(this)).catch(function (err) {
                    return console.error(err);
                });
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
        key: "displaySchedule",
        value: function displaySchedule(htmlString) {
            var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scheduleContainer;

            container.innerHTML = htmlString;
            slider.slide("next");
            this.updateRemoveFavBtnsListeners();
        }
    }, {
        key: "displayFavourites",
        value: function displayFavourites(schedules) {
            var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : favStopsContainer;

            var htmlString = "";
            schedules.forEach(function (schedule) {
                return htmlString += schedule;
            });

            if (htmlString.length > 0) {
                container.innerHTML = htmlString;
                this.updateRemoveFavBtnsListeners();
            } else {
                container.innerHTML = "\n            <p>Brak ulubionych przystank\xF3w do wy\u015Bwietlenia.</p>\n            <p>Dodaj przystanki do ulubionych by mie\u0107 je pod r\u0119k\u0105 klikaj\u0105c \"dodaj do ulubonych\" po wybraniu przystanku.</p>\n            ";
            }
        }
    }, {
        key: "renderFavourites",
        value: function renderFavourites() {
            var _this3 = this;

            var favs = this.model.favouriteStops;

            //request schedule for each stop id in favourites
            Promise.all(favs.map(function (id) {
                return _this3.controller.requestSchedule(id, false).then(function (json) {
                    return _this3.renderSchedule(json, id);
                });
            })).then(this.displayFavourites.bind(this)).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "message",
        value: function message(msg) {
            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

            msgBox.innerHTML = msg;
            //clearing last timeouts
            this.msgTimeoutIds.map(function (timeoutId) {
                return clearTimeout(timeoutId);
            });
            //show msg
            msgBox.classList.add('message-box--active');
            var id1 = setTimeout(function () {
                return msgBox.classList.add('message-box--show');
            }, 150);
            //remove msg after timeout
            var id2 = setTimeout(function () {
                return msgBox.classList.remove('message-box--show');
            }, timeout);
            var id3 = setTimeout(function () {
                return msgBox.classList.remove('message-box--active');
            }, timeout + 150);
            //saving id's
            this.msgTimeoutIds.push(id1, id2, id3);
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
        var transitionTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;

        _classCallCheck(this, Slider);

        this.slider = slider;
        this.slides = slides;
        this.translateValue = 100 / slides.length;
        this.delay = transitionTime;
    }

    _createClass(Slider, [{
        key: "slide",
        value: function slide(value) {
            var _this = this;

            var currentSlide = this.slides[slideCounter];
            var nextSlide = this.slides[slideCounter + 1];
            var prevSlide = this.slides[slideCounter - 1];

            switch (value) {
                case "next":
                    {
                        translated -= this.translateValue;
                        nextSlide.classList.add("selection__content--active");
                        setTimeout(function () {
                            return currentSlide.classList.remove("selection__content--active");
                        }, this.delay);
                        slideCounter++;
                    }
                    break;
                case "prev":
                    {
                        translated += this.translateValue;
                        prevSlide.classList.add("selection__content--active");
                        setTimeout(function () {
                            return currentSlide.classList.remove("selection__content--active");
                        }, this.delay);
                        slideCounter--;
                    }
                    break;
                case "reset":
                    {
                        translated = 0;
                        slideCounter = 0;
                        this.slides.forEach(function (element, index) {
                            if (index == 0) {
                                setTimeout(function () {
                                    return element.classList.add("selection__content--active");
                                }, _this.delay);
                            } else {
                                setTimeout(function () {
                                    return element.classList.remove("selection__content--active");
                                }, _this.delay);
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