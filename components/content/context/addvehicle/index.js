"use strict";
class AddVehicle {
    static render() {
        edom.fromTemplate([
            Input.instruction('vehicle name:', 'txtVehicleName'),
            Dropdown.instruction('reusable', ['yes', 'no']),
            Dropdown.instruction('status', [
                'planned',
                'active',
                'retired',
            ]),
            Input.instruction('stages:', 'txtStages', 'number'),
            Input.instruction('thrust at liftoff (t)', 'txtTAL', 'number'),
            {
                tag: 'button',
                children: [
                    {
                        tag: 'i',
                        classes: ['fas', 'fa-save'],
                    },
                ],
                id: 'saveVehicle',
                classes: ['saveButton'],
                handler: [
                    {
                        type: 'click',
                        arguments: '',
                        body: 'AddVehicle.saveNewVehicle()',
                        id: 'clickSaveData',
                    },
                ],
            },
        ], edom.findById('content'));
    }
    static saveNewVehicle(isEdited = false, _vehicleID = 0) {
        var _a;
        if (AddVehicle.isDataValid()) {
            const vehicleData = AddVehicle.collectData();
            const currentData = Datahandler.getData('vehicles');
            let vehicleID;
            if (!isEdited) {
                vehicleID = currentData.currentID + 1;
                currentData.currentID = vehicleID;
            }
            else {
                vehicleID = _vehicleID;
            }
            currentData[vehicleID] = vehicleData;
            Datahandler.saveData('vehicles', currentData);
            (_a = edom.findById('vehicles')) === null || _a === void 0 ? void 0 : _a.doClick();
        }
        else {
            alert('data is not complete'); // TODO custom dialog
        }
    }
    // TODO make pretty
    static isDataValid() {
        if (edom.findById('txtVehicleName').value.trim()
            .length === 0 ||
            Dropdown.getThis('reusable').options[Dropdown.getThis('reusable').value] === undefined ||
            Dropdown.getThis('status').options[Dropdown.getThis('status').value] === undefined ||
            edom.findById('txtStages').value.trim()
                .length === 0 ||
            edom.findById('txtTAL').value.trim()
                .length === 0) {
            return false;
        }
        return true;
    }
    static collectData() {
        // TODO type & status to enum or something like that
        return {
            name: edom.findById('txtVehicleName').value,
            isReusable: Dropdown.getThis('reusable').options[Dropdown.getThis('reusable').value].toString() === 'yes'
                ? true
                : false,
            status: Dropdown.getThis('status').options[Dropdown.getThis('status').value].toString(),
            stages: parseInt(edom.findById('txtStages').value),
            tal: parseInt(edom.findById('txtTAL').value),
        };
    }
}
