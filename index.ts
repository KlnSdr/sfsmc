function startup() {
    edom.init();
    createUI();
    checkStorage();
    edom.findById('missions')?.doClick();

    console.log(Datahandler.getData('vehicles'));
    console.log(Datahandler.getData('missions'));
    console.log(Datahandler.getData('constellations'));
}

function checkStorage() {
    if (!Datahandler.isStoreUsed()) {
        Datahandler.initStore();
    }
}
