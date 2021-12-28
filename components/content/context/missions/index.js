"use strict";
class Missions {
    static render() {
        edom.fromTemplate(Missions.generateCards(), edom.findById('content'));
    }
    static generateCards() {
        const missions = Datahandler.getData('missions');
        let cards = [];
        for (let i = missions.currentID; i >= 0; i--) {
            if (missions[i.toString()].type !== '[removed]') {
                cards.push(new MissionCard(missions[i.toString()], i).instruction());
            }
        }
        return cards;
    }
    static openDetails(missionID) {
        const missionData = Datahandler.getData('missions')[missionID];
        Details.show(missionData.name, [
            {
                tag: 'button',
                text: 'delete mission',
                classes: ['detailsButton', 'delete'],
                handler: [
                    {
                        type: 'click',
                        id: 'clickDeleteMission',
                        arguments: '',
                        body: `Missions.delete(${missionID})`,
                    },
                ],
            },
            {
                tag: 'button',
                text: 'edit mission',
                classes: ['detailsButton'],
                handler: [
                    {
                        type: 'click',
                        id: 'clickEditMission',
                        arguments: '',
                        body: `Missions.edit(${missionID})`,
                    },
                ],
            },
        ], [
            {
                tag: 'ul',
                children: [
                    {
                        tag: 'li',
                        text: 'acronyms: ' + missionData.acronyms,
                    },
                    {
                        tag: 'li',
                        text: 'orbited body: ' + missionData.body,
                    },
                    {
                        tag: 'li',
                        text: 'launch vehicle: ' + missionData.vehicle,
                        handler: [
                            {
                                type: 'click',
                                id: 'clickShowVehicle',
                                arguments: '',
                                body: `Missions.showLaunchVehicle("${missionData.vehicle}");`,
                            },
                        ],
                    },
                    {
                        tag: 'li',
                        text: 'status: ' + missionData.status,
                    },
                    {
                        tag: 'li',
                        text: 'type: ' + missionData.type,
                    },
                    {
                        tag: 'li',
                        text: 'apogee: ' +
                            pointify(missionData.apogee.toString()) +
                            'km',
                    },
                    {
                        tag: 'li',
                        text: 'perigee: ' +
                            pointify(missionData.perigee.toString()) +
                            'km',
                    },
                ],
            },
        ]);
    }
    static delete(missionID) {
        var _a;
        if (confirm('are you sure you want to delete this mission?')) {
            const missionsData = Datahandler.getData('missions');
            missionsData[missionID.toString()] = { type: '[removed]' };
            Datahandler.saveData('missions', missionsData);
            Details.close();
            (_a = edom.findById('missions')) === null || _a === void 0 ? void 0 : _a.doClick();
        }
    }
    static edit(missionID) {
        var _a, _b, _c, _d, _e, _f;
        // HACK recycle addmission context
        const missionData = Datahandler.getData('missions')[missionID.toString()];
        // NOTE i'm tired and sorry
        // set click for bavbar button add mission to same as before with addition of options parameter in switchContext being set,
        // click button and set it to initial state
        (_a = edom.findById('add')) === null || _a === void 0 ? void 0 : _a.addClick('clickHandlerSwitchContext', (self) => {
            Navbar.setFocus('add');
            Content.switchContext('addMission', {
                egg: missionData.type === 'blueorigin'
                    ? Egg.forceYes
                    : missionData.type === 'suborbital'
                        ? Egg.forceNo
                        : Egg.dontCare,
            });
        });
        (_b = edom.findById('add')) === null || _b === void 0 ? void 0 : _b.doClick();
        (_c = edom.findById('add')) === null || _c === void 0 ? void 0 : _c.addClick('clickHandlerSwitchContext', (self) => {
            Navbar.decideWhichAdd();
        });
        Details.close();
        edom.findById('txtMissionName').setContent(missionData.name);
        edom.findById('txtAcronyms').setContent(missionData.acronyms);
        (_d = edom.findById('headline')) === null || _d === void 0 ? void 0 : _d.setText('edit mission');
        // NOTE very ugly ===============================================================
        Dropdown.getThis('launch vehicle').setValue(Dropdown.getThis('launch vehicle').options.indexOf(missionData.vehicle));
        Dropdown.getThis('mission status').setValue(Dropdown.getThis('mission status').options.indexOf(missionData.status));
        Dropdown.getThis('mission type').setValue(Dropdown.getThis('mission type').options.indexOf(missionData.type));
        Dropdown.getThis('orbited body').setValue(Dropdown.getThis('orbited body').options.indexOf(missionData.body));
        // NOTE very ugly ===============================================================
        edom.findById('txtApogee').setContent(missionData.apogee.toString());
        edom.findById('txtPerigee').setContent(missionData.perigee.toString());
        // overwrite save button handler
        (_e = edom.findById('saveMission')) === null || _e === void 0 ? void 0 : _e.deleteClick('clickSaveData');
        (_f = edom.findById('saveMission')) === null || _f === void 0 ? void 0 : _f.addClick('clickSaveData', (self) => {
            AddMission.saveNewMission(true, missionID);
        });
    }
    static showLaunchVehicle(vehicleName) {
        if (vehicleName != 'mission specific') {
            let vehicleID = -1;
            const vehicles = Datahandler.getData('vehicles');
            for (let i = 0; i <= vehicles.currentID; i++) {
                if (vehicles[i].name === vehicleName) {
                    vehicleID = i;
                }
            }
            if (vehicleID > -1) {
                Details.close();
                Vehicles.openDetails(vehicleID);
            }
        }
    }
}
