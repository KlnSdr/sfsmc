class AddMission {
    static render() {
        edom.fromTemplate(
            [
                Input.instruction('mission name:', 'txtMissionName'),
                Input.instruction('acronyms:', 'txtAcronyms'),
                Dropdown.instruction('launch vehicle', [
                    // todo load from localStorage
                    'mission specific',
                    'Jupiter I',
                    'Jupiter II',
                    'Jupiter III',
                    'Jupiter IV',
                    'Seth',
                ]),
                Dropdown.instruction('mission status', [
                    'active',
                    'planned',
                    'destroyed',
                    'deorbited',
                    'graveyard',
                ]),
                Dropdown.instruction('mission type', [
                    'orbital',
                    Math.random() > 0.9 ? 'blueorigin' : 'suborbital',
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
                    // text: 'save',
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
            ],
            edom.findById('content')
        );
    }

    static saveNewMission() {
        if (AddMission.isDataValid()) {
            const missionData: Mission = AddMission.collectData();
            console.log(missionData);

            const currentData: obj = Datahandler.getData('missions');
            const newID: number = currentData.currentID + 1;

            currentData.currentID = newID;
            currentData[newID] = missionData;

            Datahandler.saveData('missions', currentData);
            edom.findById('missions')?.doClick();
        } else {
            alert('data is not complete'); // TODO custom dialog
        }
    }

    // TODO make pretty
    private static isDataValid(): boolean {
        if (
            (edom.findById('txtMissionName') as edomInputElement).value.trim()
                .length === 0 ||
            Dropdown.getThis('launch vehicle').options[
                Dropdown.getThis('launch vehicle').value
            ] === undefined ||
            Dropdown.getThis('mission status').options[
                Dropdown.getThis('mission status').value
            ] === undefined ||
            Dropdown.getThis('mission type').options[
                Dropdown.getThis('mission type').value
            ] === undefined ||
            Dropdown.getThis('orbited body').options[
                Dropdown.getThis('orbited body').value
            ] === undefined ||
            (edom.findById('txtApogee') as edomInputElement).value.trim()
                .length === 0 ||
            (edom.findById('txtPerigee') as edomInputElement).value.trim()
                .length === 0
        ) {
            return false;
        }
        return true;
    }

    private static collectData(): Mission {
        // TODO type, status to enum or something like that
        return {
            name: (edom.findById('txtMissionName') as edomInputElement).value,
            acronyms: (edom.findById('txtAcronyms') as edomInputElement).value,
            vehicle:
                Dropdown.getThis('launch vehicle').options[
                    Dropdown.getThis('launch vehicle').value
                ],
            status: Dropdown.getThis('mission status').options[
                Dropdown.getThis('mission status').value
            ].toString(),
            type: Dropdown.getThis('mission type').options[
                Dropdown.getThis('mission type').value
            ].toString(),
            body: Dropdown.getThis('orbited body').options[
                Dropdown.getThis('orbited body').value
            ],
            apogee: parseInt(
                (edom.findById('txtApogee') as edomInputElement).value
            ),
            perigee: parseInt(
                (edom.findById('txtPerigee') as edomInputElement).value
            ),
        };
    }
}
