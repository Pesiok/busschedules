"use strict";

//private variables
let favStops = [];
let schedule = {};
let stopId = null;

class Model {
    
    saveSchedule(json, id) {
         schedule = json;
         stopId = id;
    }

    setFavourites(arr) {
        favStops = arr;
    }

    get favouriteStops() {
        return favStops;
    }

    get schedule() {
        return schedule;
    }

    get stopId() {
        return stopId;
    }

}

export default Model;