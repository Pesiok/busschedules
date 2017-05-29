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
            this.view.renderFavourites();
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
                    _this.view.message("Coś poszło nie tak. Sprawdzenie rozkładu nie powiodło się. Spróbuj później, lub odwiedź oficjalną stronę przewoźnika.", 10000);
                    reject(console.error(err));
                });
            });
        }
    }, {
        key: "addToFavourites",
        value: function addToFavourites() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.model.stopId;

            if (this.model.favouriteStops.indexOf(id) >= 0) {
                this.view.message("Ten przystanek już jest w twoich ulubionych!");
                return false;
            } else {
                var favStops = this.model.favouriteStops;
                favStops.push(id);
                //saving current state to model and local storage
                this.model.setFavourites(favStops);
                localStorage.setItem("favouriteStops", JSON.stringify(favStops));
                //updating the view
                this.view.renderFavourites();
                this.view.message("Dodano do ulubionych!");
                return true;
            }
        }
    }, {
        key: "removeFromFavourites",
        value: function removeFromFavourites(id) {
            if (this.model.favouriteStops.indexOf(id) < 0) {
                this.view.message("Tego przystanku jeszcze nie ma w twoich ulubionych!");
                return false;
            } else {
                var filtredArr = this.model.favouriteStops.filter(function (element) {
                    return element !== id;
                });

                //saving current state to model and local storage
                this.model.setFavourites(filtredArr);
                localStorage.setItem("favouriteStops", JSON.stringify(filtredArr));
                this.view.message("Usunięto z ulubionych!");
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(model, controller, elements) {
        _classCallCheck(this, View);

        this.model = model;
        this.controller = controller;

        //DOM elements
        this.elements = elements;

        //initialize main slider
        this.mainSlider = new _Slider2.default({
            slider: elements.mainSlider,
            slides: elements.mainSliderSlides,
            back: elements.mainBack,
            reset: elements.infoBtn
        }, "main-slider", "page-header");

        //initialize selection slider
        this.selectionSlider = new _Slider2.default({
            slider: elements.selectionSlider,
            slides: elements.slidesContent,
            back: elements.backBtn,
            reset: elements.resetBtn
        }, "selection", "slider-navigation");

        //temp variables
        this.chosenCity = null;
        this.msgTimeoutIds = [];

        //function references
        this.removeFav = this.removeFromFavHandler.bind(this);

        //initialize main events
        this.events();
    }

    _createClass(View, [{
        key: "events",
        value: function events() {
            var _this = this;

            //main slider nav handlers//
            this.elements.infoBtn.addEventListener("click", function () {
                return _this.mainSlider.slide("start");
            });
            this.elements.mainBack.addEventListener("click", function () {
                return _this.mainSlider.slide("prev");
            });

            //selection slider nav handlers//
            this.elements.startBtn.addEventListener("click", function () {
                return _this.selectionSlider.slide("start");
            });
            this.elements.backBtn.addEventListener("click", function () {
                return _this.selectionSlider.slide("prev");
            });
            this.elements.resetBtn.addEventListener("click", function () {
                return _this.selectionSlider.slide("reset");
            });

            //selection handlers//
            var stopHandler = this.stopSelectionHandler.bind(this);
            this.elements.citySelectionBtns.addEventListener("click", function (event) {
                //remove old listener if there was any
                if (_this.chosenCity) _this.chosenCity.removeEventListener("click", stopHandler);
                //get new city after click on btn
                _this.citySelectionHandler(event);
                //if city was clicked, attach event handler
                if (_this.chosenCity) _this.chosenCity.addEventListener("click", stopHandler);
            });

            //fav handlers//
            this.elements.addToFavBtn.addEventListener("click", this.addToFavHandler.bind(this));
            this.updateRemoveFavBtnsListeners();

            //refresh handler//
            this.elements.refreshBtn.addEventListener("click", function () {
                return _this.refreshFavourites();
            });
        }
    }, {
        key: "updateRemoveFavBtnsListeners",
        value: function updateRemoveFavBtnsListeners() {
            var _this2 = this;

            //called whenever new remove btn is added...so terrible
            this.elements.removeFromFavBtns = [].concat(_toConsumableArray(document.querySelectorAll(".schedule__button-remove")));

            if (this.elements.removeFromFavBtns.length > 0) {
                this.elements.removeFromFavBtns.forEach(function (element) {
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
                //remove schedule with specified id from the DOM
                var schedule = document.querySelector("#favStops #stop-" + id);
                schedule.parentNode.removeChild(schedule);
                //render placeholder information if favs are empty
                if (this.model.favouriteStops <= 0) this.displayFavourites([]);
            }
        }
    }, {
        key: "citySelectionHandler",
        value: function citySelectionHandler(event) {
            if (event.target && event.target.matches("button")) {
                //hide prev city if there was any
                if (this.chosenCity) this.chosenCity.classList.remove("stops--active");
                var value = event.target.dataset.value;
                //get new city
                this.chosenCity = this.elements.stopSelection.querySelector("#" + value);
                //display only stops from chosen city
                this.chosenCity.classList.add("stops--active");
                this.selectionSlider.slide("next");
            }
        }
    }, {
        key: "stopSelectionHandler",
        value: function stopSelectionHandler(event) {
            var _this3 = this;

            if (event.target && event.target.matches("button")) {
                var id = event.target.dataset.value;

                //add loading animation
                this.chosenCity.classList.add("stops--loading");

                //request new Schedule
                this.controller.requestSchedule(id).then(this.renderSchedule.bind(this)).then(function (htmlString) {
                    //remove loading animation
                    _this3.chosenCity.classList.remove("stops--loading");
                    _this3.displaySchedule(htmlString);
                }).catch(function () {
                    //remove loading animation
                    _this3.chosenCity.classList.remove("stops--loading");
                    //if slider is not closed and user is still wating for response, show placeholder msg
                    if (_this3.selectionSlider.isSliderReseted) {
                        _this3.displaySchedule("\n                            <p>Nie mo\u017Cna by\u0142o pobra\u0107 rozk\u0142ad\xF3w. :<</p>\n                            <p>Spr\xF3buj ponownie p\xF3\u017Aniej lub skorzystaj z oficjalnej strony przewo\u017Anika</p>\n                        ");
                    }
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

                    departures += "\n            <tr class=\"schedule__table-row\">\n                <td>" + departure.time + "</td>\n                <td>" + departure.line + "</td>\n                <td>" + departure.destination + "</td>\n            </tr>\n                ";
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
                resolve("\n            <div id=\"stop-" + id + "\" class=\"schedule\">\n                <header class=\"schedule__header\">\n                    <h3 class=\"schedule__title\">" + schedule.stop + "</h3>\n                    <button data-value=\"" + id + "\" \n                        title=\"Usu\u0144 z ulubionych\" \n                        aria-label=\"Usu\u0144 z ulubionych\" \n                        class=\"schedule__button-remove material-icons\">delete\n                    </button>\n                </header>\n                <table class=\"schedule__table\">\n                    <tr class=\"schedule__table-headings\">\n                        <th>Odjazd</th>\n                        <th>Linia</th>\n                        <th>Kierunek</th>\n                    </tr>\n                    " + departures + "\n                </table>\n            </div>\n        ");
            });
        }
    }, {
        key: "showSchedules",
        value: function showSchedules() {
            var schedules = [].concat(_toConsumableArray(document.querySelectorAll(".schedule")));
            var delay = 300;
            var counter = 1;

            //load-in animation witch delay between each element
            schedules.forEach(function (schedule) {
                schedule.classList.add("schedule--active");
                setTimeout(function () {
                    return schedule.classList.add("schedule--show");
                }, delay * counter);
                counter++;
            });
        }
    }, {
        key: "displaySchedule",
        value: function displaySchedule(htmlString) {
            var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.elements.scheduleContainer;

            container.innerHTML = htmlString;
            this.selectionSlider.slide("next");
            this.updateRemoveFavBtnsListeners();
            this.showSchedules();
        }
    }, {
        key: "refreshFavourites",
        value: function refreshFavourites() {
            var favs = this.model.favouriteStops;

            if (favs.length > 0) {
                this.renderFavourites(favs);
                this.message("Odświeżono!", 2000);
            } else {
                this.message("Nie ma w ulubionych żadnych przystanków do odświeżenia!");
            }
        }
    }, {
        key: "displayFavourites",
        value: function displayFavourites(schedules) {
            var htmlString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.elements.favStopsContainer;

            if (schedules) {
                schedules.forEach(function (schedule) {
                    return htmlString += schedule;
                });
                if (htmlString.length > 0) {
                    //display fav stops
                    container.innerHTML = htmlString;
                    this.updateRemoveFavBtnsListeners();
                    this.showSchedules();
                } else {
                    //no fav stops to display
                    container.innerHTML = "\n                <div class=\"placeholder\">\n                    <p class=\"placeholder__title\">Brak ulubionych przystank\xF3w do wy\u015Bwietlenia. </p>\n                    <p class=\"placeholder__info\">Dodaj przystanki do ulubionych by mie\u0107 je pod r\u0119k\u0105 klikaj\u0105c w <span class=\"placeholder__icon material-icons\">favorite</span> po wybraniu przystanku.</p>\n                </div>\n                ";
                }
            } else {
                //custom msg
                container.innerHTML = htmlString;
            }
        }
    }, {
        key: "renderFavourites",
        value: function renderFavourites() {
            var _this4 = this;

            var favs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.model.favouriteStops;

            var container = this.elements.favStopsContainer;

            //add loading animation
            container.classList.add("fav-stops__container--loading");

            //request schedule for each stop id in favourites
            Promise.all(favs.map(function (id) {
                return _this4.controller.requestSchedule(id, false).then(function (json) {
                    return _this4.renderSchedule(json, id);
                });
            })).then(function (schedules) {
                //remove loading animation
                container.classList.remove("fav-stops__container--loading");
                //display rendered favs
                _this4.displayFavourites(schedules, "", container);
            }).catch(function (err) {
                console.error(err);
                //remove loading animation
                container.classList.remove("fav-stops__container--loading");
                //display placeholder information
                _this4.displayFavourites(null, "\n                <div class=\"placeholder\">\n                    <p class=\"placeholder__title\">Nie mo\u017Cna by\u0142o pobra\u0107 rozk\u0142ad\xF3w.</p>\n                    <p class=\"placeholder__info\">Spr\xF3buj ponownie p\xF3\u017Aniej lub skorzystaj z oficjalnej strony przewo\u017Anika</p>\n                </div>\n            ", container);
            });
        }
    }, {
        key: "message",
        value: function message(msg) {
            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3500;

            var msgBox = this.elements.msgBox;
            var timeoutDelay = 300;

            msgBox.innerHTML = "\n            <span class=\"message-box__icon material-icons\" aria-hidden=\"true\">announcement</span>\n            <p class=\"message-box__text\">" + msg + "</p>\n        ";
            //clearing last timeouts
            this.msgTimeoutIds.map(function (timeoutId) {
                return clearTimeout(timeoutId);
            });
            //show msg
            msgBox.classList.add('message-box--active');
            var id1 = setTimeout(function () {
                return msgBox.classList.add('message-box--show');
            }, timeoutDelay);
            //remove msg after timeout
            var id2 = setTimeout(function () {
                return msgBox.classList.remove('message-box--show');
            }, timeout - timeoutDelay);
            var id3 = setTimeout(function () {
                return msgBox.classList.remove('message-box--active');
            }, timeout + timeoutDelay);
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

document.addEventListener("DOMContentLoaded", function () {
    var elements = {
        selectionSlider: document.querySelector(".selection__slider"),
        slidesContent: [].concat(_toConsumableArray(document.querySelectorAll(".selection__content"))),
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
        removeFromFavBtns: [].concat(_toConsumableArray(document.querySelectorAll(".schedule__button-remove"))),
        mainSlider: document.querySelector(".main-slider"),
        mainSliderSlides: [].concat(_toConsumableArray(document.querySelectorAll(".main-slider__content"))),
        infoBtn: document.getElementById("infoBtn"),
        mainBack: document.getElementById("mainBack")

    };

    var model = new _Model2.default();
    var controller = new _Controller2.default();
    var view = new _View2.default(model, controller, elements);

    controller.initialize(model, view);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
    function Slider(elements, blockCssClass) {
        var navigationCssClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var transitionTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;

        _classCallCheck(this, Slider);

        //const variables
        this.elements = elements;
        this.blockCssClass = blockCssClass;
        this.navigationCssClass = navigationCssClass;
        this.translateValue = 100 / elements.slides.length;
        this.delay = transitionTime;
        //working variables
        this.translated = 0;
        this.slideCounter = 0;
        this.areBtnsToggled = false;
        this.isSliderReseted = true;
    }

    _createClass(Slider, [{
        key: "slide",
        value: function slide(value) {
            var _this = this;

            var currentSlide = this.elements.slides[this.slideCounter];
            var nextSlide = this.elements.slides[this.slideCounter + 1];
            var prevSlide = this.elements.slides[this.slideCounter - 1];

            switch (value) {
                case "start":
                    {
                        this.isSliderReseted = false;
                        if (this.navigationCssClass) this.toggleButtons();
                        this.slide("next");
                    }
                    break;
                case "next":
                    {
                        this.translated -= this.translateValue;
                        nextSlide.classList.add(this.blockCssClass + "__content--active");

                        setTimeout(function () {
                            return currentSlide.classList.remove(_this.blockCssClass + "__content--active");
                        }, this.delay);
                        this.slideCounter++;
                    }
                    break;
                case "prev":
                    {
                        this.translated += this.translateValue;
                        prevSlide.classList.add(this.blockCssClass + "__content--active");
                        setTimeout(function () {
                            return currentSlide.classList.remove(_this.blockCssClass + "__content--active");
                        }, this.delay);
                        this.slideCounter--;

                        if (this.slideCounter === 0) {
                            if (this.navigationCssClass) this.toggleButtons();
                            this.isSliderReseted = true;
                        }
                    }
                    break;
                case "reset":
                    {
                        //reseting to the initial state of the slider
                        this.isSliderReseted = true;
                        this.translated = 0;
                        this.slideCounter = 0;
                        this.elements.slides.forEach(function (element, index) {
                            if (index == 0) {
                                setTimeout(function () {
                                    return element.classList.add(_this.blockCssClass + "__content--active");
                                }, _this.delay);
                            } else {
                                setTimeout(function () {
                                    return element.classList.remove(_this.blockCssClass + "__content--active");
                                }, _this.delay);
                            }
                        });
                        if (this.navigationCssClass) this.toggleButtons();
                    }
                    break;
                default:
                    {
                        console.log("whaa input \"" + value + "\" is incorrect!");
                    }
            }
            //translate slides in the slider
            this.elements.slider.style.transform = "translateX(" + this.translated + "%)";
        }
    }, {
        key: "toggleButtons",
        value: function toggleButtons() {
            var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;

            var backBtn = this.elements.back,
                resetBtn = this.elements.reset;

            // show Buttons: first = active, second = show
            // hide Buttons: first = show, second = active
            var first = this.areBtnsToggled ? "show" : "active",
                second = this.areBtnsToggled ? "active" : "show",
                navigationClass = this.navigationCssClass;

            if (backBtn) backBtn.classList.toggle(navigationClass + "__button--" + first);
            if (resetBtn) resetBtn.classList.toggle(navigationClass + "__button--" + first);

            setTimeout(function () {
                if (backBtn) backBtn.classList.toggle(navigationClass + "__button--" + second);
                if (resetBtn) resetBtn.classList.toggle(navigationClass + "__button--" + second);
            }, delay);

            //changing value to the opposite
            this.areBtnsToggled = !this.areBtnsToggled;
        }
    }]);

    return Slider;
}();

exports.default = Slider;

/***/ })
/******/ ]);