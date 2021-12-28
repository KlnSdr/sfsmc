class Content {
    private static headlines: { [key: string]: string } = {
        missions: 'missions',
        constellations: 'constellations',
        addMission: 'add mission',
        vehicles: 'launch vehicles',
        addVehicle: 'add launch vehicle',
        stats: 'statistics',
        settings: 'settings',
    };

    static render() {
        edom.fromTemplate({
            children: [
                {
                    tag: 'div',
                    classes: ['topbar'],
                    children: [
                        {
                            tag: 'h2',
                            id: 'headline',
                            text: '',
                        },
                        {
                            tag: 'button',
                            classes: ['fas', 'fa-ellipsis-h', 'settings'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickSwitchToSettings',
                                    arguments: '',
                                    body: 'Navbar.setFocus("add"); Content.switchContext("settings")',
                                },
                            ],
                        },
                    ],
                },
                {
                    tag: 'div',
                    id: 'content',
                    classes: ['content'],
                },
            ],
        });
    }

    static switchContext(targetName: string, options: obj = {}) {
        // check if current context is the same as next to save ressources
        if (
            edom.findById('headline')?.text === this.headlines[targetName] &&
            options.forceReload === undefined
        ) {
            return;
        }

        edom.findById('content')?.clear();
        Dropdown.removeDropdowns();

        switch (targetName) {
            case 'missions':
                Missions.render();
                break;
            case 'addMission':
                AddMission.render(
                    options.egg !== undefined ? options.egg : Egg.dontCare
                );
                break;
            case 'constellations':
                Constellations.render();
                break;
            case 'stats':
                Statistics.render();
                break;
            case 'vehicles':
                Vehicles.render();
                break;
            case 'addVehicle':
                AddVehicle.render();
                break;
            case 'settings':
                Settings.render();
                break;
            default:
                break;
        }

        edom.findById('headline')?.setText(this.headlines[targetName]);
    }
}
