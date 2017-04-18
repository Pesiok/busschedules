"use strict";

//private variables
const favStops = [];
let schedule = {};
let stopId = null;

class Model {
    
    saveSchedule(json, id) {
         schedule = json;
         stopId = id;
    }

    saveToFavourites(id) {
        favStops.push(id);
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