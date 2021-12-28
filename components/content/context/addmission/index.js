"use strict";
var Egg;
(function (Egg) {
    Egg[Egg["forceYes"] = 0] = "forceYes";
    Egg[Egg["forceNo"] = 1] = "forceNo";
    Egg[Egg["dontCare"] = 2] = "dontCare";
})(Egg || (Egg = {}));
class AddMission {
    static render(egg = Egg.dontCare) {
        edom.fromTemplate([
            Input.instruction('mission name:', 'txtMissionName'),
            Input.instruction('acronyms:', 'txtAcronyms'),
            Dropdown.instruction('launch vehicle', AddMission.loadLaunchVehicles()),
            Dropdown.instruction('mission status', [
                'active',
                'planned',
                'destroyed',
                'deorbited',
                'graveyard',
            ]),
            Dropdown.instruction('mission type', [
                'orbital',
                this.bunny(egg),
            ]),
            Dropdown.instruction('orbited body', [
                'none',
                'sun',
                'mercury',
                'venus',
                'earth',
                'moon',
                'mars',
                'phobos',
                'deimos',
                'jupiter',
                'io',
                'europa',
                'callisto',
                'ganymede',
            ]),
            Input.instruction('apogee (km):', 'txtApogee', 'number'),
            Input.instruction('perigee (km):', 'txtPerigee', 'number'),
            {
                tag: 'button',
                children: [
                    {
                        tag: 'i',
                        classes: ['fas', 'fa-save'],
                    },
                ],
                id: 'saveMission',
                classes: ['saveButton'],
                handler: [
                    {
                        type: 'click',
                        arguments: '',
                        body: 'AddMission.saveNewMission()',
                        id: 'clickSaveData',
                    },
                ],
            },
        ], edom.findById('content'));
    }
    static saveNewMission(isEdited = false, _missionID = 0) {
        var _a;
        if (AddMission.isDataValid()) {
            const missionData = AddMission.collectData();
            const currentData = Datahandler.getData('missions');
            let missionID;
            if (!isEdited) {
                missionID = currentData.currentID + 1;
                currentData.currentID = missionID;
            }
            else {
                missionID = _missionID;
            }
            currentData[missionID] = missionData;
            Datahandler.saveData('missions', currentData);
            (_a = edom.findById('missions')) === null || _a === void 0 ? void 0 : _a.doClick();
        }
        else {
            alert('data is not complete'); // TODO custom dialog
        }
    }
    // TODO make pretty
    static isDataValid() {
        if (edom.findById('txtMissionName').value.trim()
            .length === 0 ||
            Dropdown.getThis('launch vehicle').options[Dropdown.getThis('launch vehicle').value] === undefined ||
            Dropdown.getThis('mission status').options[Dropdown.getThis('mission status').value] === undefined ||
            Dropdown.getThis('mission type').options[Dropdown.getThis('mission type').value] === undefined ||
            Dropdown.getThis('orbited body').options[Dropdown.getThis('orbited body').value] === undefined ||
            edom.findById('txtApogee').value.trim()
                .length === 0 ||
            edom.findById('txtPerigee').value.trim()
                .length === 0) {
            return false;
        }
        return true;
    }
    static collectData() {
        // TODO type & status to enum or something like that
        return {
            name: edom.findById('txtMissionName').value,
            acronyms: edom.findById('txtAcronyms').value,
            vehicle: Dropdown.getThis('launch vehicle').options[Dropdown.getThis('launch vehicle').value],
            status: Dropdown.getThis('mission status').options[Dropdown.getThis('mission status').value].toString(),
            type: Dropdown.getThis('mission type').options[Dropdown.getThis('mission type').value].toString(),
            body: Dropdown.getThis('orbited body').options[Dropdown.getThis('orbited body').value],
            apogee: parseInt(edom.findById('txtApogee').value),
            perigee: parseInt(edom.findById('txtPerigee').value),
        };
    }
    static bunny(egg) {
        switch (egg) {
            case Egg.forceYes:
                return 'blueorigin';
                break;
            case Egg.forceNo:
                return 'suborbital';
            case Egg.dontCare:
                return Math.random() > 0.9 ? 'blueorigin' : 'suborbital';
        }
    }
    static loadLaunchVehicles() {
        const vehicles = Datahandler.getData('vehicles');
        let output = ['mission specific'];
        for (let i = 0; i <= vehicles.currentID; i++) {
            if (vehicles[i.toString()].type !== '[removed]') {
                output.push(vehicles[i].name);
            }
        }
        return output;
    }
}
