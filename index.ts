function startup() {
    edom.init();
    createUI();
    checkStorage();
    edom.findById('missions')?.doClick();
}

function checkStorage() {
    if (!Datahandler.isStoreUsed()) {
        Datahandler.initStore();
    }
}
