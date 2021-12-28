class Missions {
    static render() {
        edom.fromTemplate(Missions.generateCards(), edom.findById('content'));
    }

    private static generateCards(): obj[] {
        const missions: obj = Datahandler.getData('missions');
        let cards: obj[] = [];

        for (let i = missions.currentID; i >= 0; i--) {
            if (missions[i.toString()].type !== '[removed]') {
                cards.push(
                    new MissionCard(missions[i.toString()], i).instruction()
                );
            }
        }

        return cards;
    }

    static openDetails(missionID: number) {
        const missionData: Mission = Datahandler.getData('missions')[missionID];
        Details.show(
            missionData.name,
            [
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
            ],
            [
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
                            text:
                                'apogee: ' +
                                pointify(missionData.apogee.toString()) +
                                'km',
                        },
                        {
                            tag: 'li',
                            text:
                                'perigee: ' +
                                pointify(missionData.perigee.toString()) +
                                'km',
                        },
                    ],
                },
            ]
        );
    }

    static delete(missionID: number) {
        if (confirm('are you sure you want to delete this mission?')) {
            const missionsData: obj = Datahandler.getData('missions');
            missionsData[missionID.toString()] = { type: '[removed]' };

            Datahandler.saveData('missions', missionsData);
            Details.close();
            Content.switchContext('missions', { forceReload: true });
        }
    }

    static edit(missionID: number) {
        // HACK recycle addmission context
        const missionData: Mission =
            Datahandler.getData('missions')[missionID.toString()];

        // NOTE i'm tired and sorry
        // set click for bavbar button add mission to same as before with addition of options parameter in switchContext being set,
        // click button and set it to initial state
        edom.findById('add')?.addClick(
            'clickHandlerSwitchContext',
            (self: edomElement) => {
                Navbar.setFocus('add');
                Content.switchContext('addMission', {
                    egg:
                        missionData.type === 'blueorigin'
                            ? Egg.forceYes
                            : missionData.type === 'suborbital'
                            ? Egg.forceNo
                            : Egg.dontCare,
                });
            }
        );
        edom.findById('add')?.doClick();
        edom.findById('add')?.addClick(
            'clickHandlerSwitchContext',
            (self: edomElement) => {
                Navbar.decideWhichAdd();
            }
        );

        Details.close();

        (edom.findById('txtMissionName') as edomInputElement).setContent(
            missionData.name
        );

        (edom.findById('txtAcronyms') as edomInputElement).setContent(
            missionData.acronyms
        );

        edom.findById('headline')?.setText('edit mission');

        // NOTE very ugly ===============================================================
        (Dropdown.getThis('launch vehicle') as DropdownCode).setValue(
            (
                Dropdown.getThis('launch vehicle') as DropdownCode
            ).options.indexOf(missionData.vehicle)
        );

        (Dropdown.getThis('mission status') as DropdownCode).setValue(
            (
                Dropdown.getThis('mission status') as DropdownCode
            ).options.indexOf(missionData.status)
        );

        (Dropdown.getThis('mission type') as DropdownCode).setValue(
            (Dropdown.getThis('mission type') as DropdownCode).options.indexOf(
                missionData.type
            )
        );

        (Dropdown.getThis('orbited body') as DropdownCode).setValue(
            (Dropdown.getThis('orbited body') as DropdownCode).options.indexOf(
                missionData.body
            )
        );
        // NOTE very ugly ===============================================================

        (edom.findById('txtApogee') as edomInputElement).setContent(
            missionData.apogee.toString()
        );

        (edom.findById('txtPerigee') as edomInputElement).setContent(
            missionData.perigee.toString()
        );

        // overwrite save button handler
        edom.findById('saveMission')?.deleteClick('clickSaveData');
        edom.findById('saveMission')?.addClick(
            'clickSaveData',
            (self: edomElement) => {
                AddMission.saveNewMission(true, missionID);
            }
        );
    }

    static showLaunchVehicle(vehicleName: string) {
        if (vehicleName != 'mission specific') {
            let vehicleID: number = -1;

            const vehicles: obj = Datahandler.getData('vehicles');

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
