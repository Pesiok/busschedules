"use strict";

//private variables
const priv = new WeakMap();
const _ = instance => priv.get(instance);

class Model {
    constructor() {
        const privateMembrs = {
            schedule: {},
            stopId: 0, 
            favStops: [], 
            maxFavStops: 10
        }
        priv.set(this, privateMembrs);
    }

    saveSchedule(json, id) {
         _(this).schedule = json;
         _(this).stopId = id;
    }

    saveToFavourites(id) {
        _(this).stopId.push(id);
    }

    get schedule() {
        return _(this).schedule;
    }

    get stopId() {
        return _(this).stopId;
    }

}

export default Model;