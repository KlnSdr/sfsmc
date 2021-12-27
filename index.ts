function startup() {
    edom.init();
    createUI();
    checkStorage();
    // edom.findById('missions')?.doClick();
    edom.findById('vehicles')?.doClick();
}

function checkStorage() {
    if (!Datahandler.isStoreUsed()) {
        Datahandler.initStore();
    }
}
