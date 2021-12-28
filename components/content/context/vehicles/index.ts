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
        // HACK recycle addmission context
        const vehicleData: Vehicle =
            Datahandler.getData('vehicles')[vehicleID.toString()];

        // NOTE i'm tired and sorry
        // set click for bavbar button add mission to same as before with addition of options parameter in switchContext being set,
        // click button and set it to initial state
        edom.findById('add')?.addClick(
            'clickHandlerSwitchContext',
            (self: edomElement) => {
                Navbar.setFocus('add');
                Content.switchContext('addVehicle');
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

        edom.findById('headline')?.setText('edit launch vehicle');

        (edom.findById('txtVehicleName') as edomInputElement).setContent(
            vehicleData.name
        );

        // NOTE very ugly ===============================================================
        (Dropdown.getThis('reusable') as DropdownCode).setValue(
            (Dropdown.getThis('reusable') as DropdownCode).options.indexOf(
                vehicleData.isReusable ? 'yes' : 'no'
            )
        );
        // NOTE very ugly ===============================================================

        (edom.findById('txtStages') as edomInputElement).setContent(
            vehicleData.stages.toString()
        );

        (edom.findById('txtTAL') as edomInputElement).setContent(
            vehicleData.tal.toString()
        );

        // overwrite save button handler
        edom.findById('saveVehicle')?.deleteClick('clickSaveData');
        edom.findById('saveVehicle')?.addClick(
            'clickSaveData',
            (self: edomElement) => {
                AddVehicle.saveNewVehicle(true, vehicleID);
            }
        );
    }
}
