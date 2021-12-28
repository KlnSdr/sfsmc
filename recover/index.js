"use strict";
function recover() {
    const rawUrl = document.URL;
    const url = new URL(rawUrl);
    const data = url.searchParams.get('data');
    if (data != null) {
        const parsedData = JSON.parse(atob(data));
        Datahandler.saveData('missions', parsedData.missions);
        Datahandler.saveData('vehicles', parsedData.vehicles);
    }
    location.assign('../');
}
