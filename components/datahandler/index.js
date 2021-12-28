"use strict";
class Datahandler {
    static saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    static getData(key) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }
    static isStoreUsed() {
        return localStorage.length > 0;
    }
    static initStore() {
        Datahandler.saveData('vehicles', {
            currentID: -1,
        });
        Datahandler.saveData('missions', {
            currentID: -1,
        });
        Datahandler.saveData('constellations', {
            currentID: -1,
        });
    }
}
