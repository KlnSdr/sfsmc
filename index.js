"use strict";
function startup() {
    var _a;
    edom.init();
    createUI();
    checkStorage();
    (_a = edom.findById('missions')) === null || _a === void 0 ? void 0 : _a.doClick();
}
function checkStorage() {
    if (!Datahandler.isStoreUsed()) {
        Datahandler.initStore();
    }
}
