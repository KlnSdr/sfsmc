function startup() {
    edom.init();
    createUI();
    edom.findById('add')?.doClick();
}
