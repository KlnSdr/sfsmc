class Vehicles {
    static render() {
        edom.fromTemplate(Vehicles.generateCards(), edom.findById('content'));
    }

    private static generateCards(): obj[] {
        const vehicles: obj = Datahandler.getData('vehicles');
        let cards: obj[] = [];

        for (let i = vehicles.currentID; i >= 0; i--) {
            if (vehicles[i.toString()].type !== '[removed]') {
                cards.push(
                    new VehicleCard(vehicles[i.toString()], i).instruction()
                );
            }
        }

        return cards;
    }

    static openDetails(vehicleID: number) {
        const vehicleData: Vehicle = Datahandler.getData('vehicles')[vehicleID];
        Details.show(
            vehicleData.name,
            [
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
            ],
            [
                {
                    tag: 'ul',
                    children: [
                        {
                            tag: 'li',
                            text: 'stages: ' + vehicleData.stages,
                        },
                        {
                            tag: 'li',
                            text:
                                'reusable: ' +
                                (vehicleData.isReusable ? 'yes' : 'no'),
                        },
                        {
                            tag: 'li',
                            text:
                                'thrust at liftoff: ' +
                                pointify(vehicleData.tal.toString()) +
                                't',
                        },
                    ],
                },
            ]
        );
    }

    static delete(vehicleID: number) {
        if (confirm('are you sure you want to delete this vehicle?')) {
            const vehicleData: obj = Datahandler.getData('vehicles');
            vehicleData[vehicleID.toString()] = { type: '[removed]' };

            Datahandler.saveData('vehicles', vehicleData);
            Details.close();
            edom.findById('vehicles')?.doClick();
        }
    }

    static edit(vehicleID: number) {
        Details.close();
        return;

        // HACK recycle addmission context
        const missionData: Mission =
            Datahandler.getData('missions')[vehicleID.toString()];

        // NOTE i'm tired and sorry
        // set click for bavbar button add mission to same as before with addition of options parameter in switchContext being set,
        // click button and set it to initial state
        edom.findById('add')?.addClick(
            'clickHandlerSwitchContext',
            (self: edomElement) => {
                // TODO change for vehicles if needed
                Navbar.setFocus('add');
                Content.switchContext('add', {
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
                AddMission.saveNewMission(true, vehicleID);
            }
        );
    }
}
