"use strict";
class Vehicles {
    static render() {
        edom.fromTemplate(Vehicles.generateCards(), edom.findById('content'));
    }
    static generateCards() {
        const vehicles = Datahandler.getData('vehicles');
        let cards = [];
        for (let i = vehicles.currentID; i >= 0; i--) {
            if (vehicles[i.toString()].type !== '[removed]') {
                cards.push(new VehicleCard(vehicles[i.toString()], i).instruction());
            }
        }
        return cards;
    }
    static openDetails(vehicleID) {
        const vehicleData = Datahandler.getData('vehicles')[vehicleID];
        Details.show(vehicleData.name, [
            {
                tag: 'button',
                text: 'delete vehicle',
                classes: ['detailsButton', 'delete'],
                handler: [
                    {
                        type: 'click',
                        id: 'clickDeleteMission',
                        arguments: '',
                        body: `Vehicles.delete(${vehicleID})`,
                    },
                ],
            },
            {
                tag: 'button',
                text: 'edit vehicle',
                classes: ['detailsButton'],
                handler: [
                    {
                        type: 'click',
                        id: 'clickEditMission',
                        arguments: '',
                        body: `Vehicles.edit(${vehicleID})`,
                    },
                ],
            },
        ], [
            {
                tag: 'ul',
                children: [
                    {
                        tag: 'li',
                        text: 'stages: ' + vehicleData.stages,
                    },
                    {
                        tag: 'li',
                        text: 'reusable: ' +
                            (vehicleData.isReusable ? 'yes' : 'no'),
                    },
                    {
                        tag: 'li',
                        text: 'thrust at liftoff: ' +
                            pointify(vehicleData.tal.toString()) +
                            't',
                    },
                ],
            },
        ]);
    }
    static delete(vehicleID) {
        var _a;
        if (confirm('are you sure you want to delete this vehicle?')) {
            const vehicleData = Datahandler.getData('vehicles');
            vehicleData[vehicleID.toString()] = { type: '[removed]' };
            Datahandler.saveData('vehicles', vehicleData);
            Details.close();
            (_a = edom.findById('vehicles')) === null || _a === void 0 ? void 0 : _a.doClick();
        }
    }
    static edit(vehicleID) {
        var _a, _b, _c, _d, _e, _f;
        // HACK recycle addmission context
        const vehicleData = Datahandler.getData('vehicles')[vehicleID.toString()];
        // NOTE i'm tired and sorry
        // set click for bavbar button add mission to same as before with addition of options parameter in switchContext being set,
        // click button and set it to initial state
        (_a = edom.findById('add')) === null || _a === void 0 ? void 0 : _a.addClick('clickHandlerSwitchContext', (self) => {
            Navbar.setFocus('add');
            Content.switchContext('addVehicle');
        });
        (_b = edom.findById('add')) === null || _b === void 0 ? void 0 : _b.doClick();
        (_c = edom.findById('add')) === null || _c === void 0 ? void 0 : _c.addClick('clickHandlerSwitchContext', (self) => {
            Navbar.decideWhichAdd();
        });
        Details.close();
        (_d = edom.findById('headline')) === null || _d === void 0 ? void 0 : _d.setText('edit launch vehicle');
        edom.findById('txtVehicleName').setContent(vehicleData.name);
        // NOTE very ugly ===============================================================
        Dropdown.getThis('reusable').setValue(Dropdown.getThis('reusable').options.indexOf(vehicleData.isReusable ? 'yes' : 'no'));
        // NOTE very ugly ===============================================================
        edom.findById('txtStages').setContent(vehicleData.stages.toString());
        edom.findById('txtTAL').setContent(vehicleData.tal.toString());
        // overwrite save button handler
        (_e = edom.findById('saveVehicle')) === null || _e === void 0 ? void 0 : _e.deleteClick('clickSaveData');
        (_f = edom.findById('saveVehicle')) === null || _f === void 0 ? void 0 : _f.addClick('clickSaveData', (self) => {
            AddVehicle.saveNewVehicle(true, vehicleID);
        });
    }
}
