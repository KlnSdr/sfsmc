class AddVehicle {
    static render() {
        edom.fromTemplate(
            [
                Input.instruction('vehicle name:', 'txtVehicleName'),
                Dropdown.instruction('reusable', ['yes', 'no']),
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
            ],
            edom.findById('content')
        );
    }

    static saveNewVehicle(isEdited: boolean = false, _vehicleID: number = 0) {
        if (AddVehicle.isDataValid()) {
            const vehicleData: Vehicle = AddVehicle.collectData();

            const currentData: obj = Datahandler.getData('vehicles');

            let vehicleID: number;
            if (!isEdited) {
                vehicleID = currentData.currentID + 1;
                currentData.currentID = vehicleID;
            } else {
                vehicleID = _vehicleID;
            }

            currentData[vehicleID] = vehicleData;

            Datahandler.saveData('vehicles', currentData);
            edom.findById('vehicles')?.doClick();
        } else {
            alert('data is not complete'); // TODO custom dialog
        }
    }

    // TODO make pretty
    private static isDataValid(): boolean {
        if (
            (edom.findById('txtVehicleName') as edomInputElement).value.trim()
                .length === 0 ||
            Dropdown.getThis('reusable').options[
                Dropdown.getThis('reusable').value
            ] === undefined ||
            (edom.findById('txtStages') as edomInputElement).value.trim()
                .length === 0 ||
            (edom.findById('txtTAL') as edomInputElement).value.trim()
                .length === 0
        ) {
            return false;
        }
        return true;
    }

    static collectData(): Vehicle {
        // TODO type & status to enum or something like that
        return {
            name: (edom.findById('txtVehicleName') as edomInputElement).value,
            isReusable:
                Dropdown.getThis('reusable').options[
                    Dropdown.getThis('reusable').value
                ].toString() === 'yes'
                    ? true
                    : false,
            stages: parseInt(
                (edom.findById('txtStages') as edomInputElement).value
            ),
            tal: parseInt((edom.findById('txtTAL') as edomInputElement).value),
        };
    }
}
