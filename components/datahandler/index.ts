class Datahandler {
    static saveData(key: string, data: obj) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getData(key: string): obj {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    static isStoreUsed(): boolean {
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
