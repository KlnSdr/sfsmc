enum Egg {
    forceYes,
    forceNo,
    dontCare,
}

class AddMission {
    static render(egg: Egg = Egg.dontCare) {
        edom.fromTemplate(
            [
                Input.instruction('mission name:', 'txtMissionName'),
                Input.instruction('acronyms:', 'txtAcronyms'),
                Dropdown.instruction(
                    'launch vehicle',
                    AddMission.loadLaunchVehicles()
                ),
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
            ],
            edom.findById('content')
        );
    }

    static saveNewMission(isEdited: boolean = false, _missionID: number = 0) {
        if (AddMission.isDataValid()) {
            const missionData: Mission = AddMission.collectData();

            const currentData: obj = Datahandler.getData('missions');

            let missionID: number;
            if (!isEdited) {
                missionID = currentData.currentID + 1;
                currentData.currentID = missionID;
            } else {
                missionID = _missionID;
            }

            currentData[missionID] = missionData;

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

    static collectData(): Mission {
        // TODO type & status to enum or something like that
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

    private static bunny(egg: Egg): string {
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

    private static loadLaunchVehicles(): string[] {
        const vehicles: obj = Datahandler.getData('vehicles');
        let output: string[] = ['mission specific'];

        for (let i = 0; i <= vehicles.currentID; i++) {
            if (
                vehicles[i.toString()].type !== '[removed]' &&
                vehicles[i.toString()].status !== 'retired'
            ) {
                output.push(vehicles[i].name);
            }
        }

        return output;
    }
}
