class Datahandler {
    static saveData(key: string, data: obj) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getData(key: string): obj {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    static isStorageUsed(): boolean {
        return localStorage.length > 0;
    }
}
