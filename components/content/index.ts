class Content {
    private static headlines: { [key: string]: string } = {
        missions: 'missions',
        constellations: 'constellations',
        addMission: 'add mission',
        vehicles: 'launch vehicles',
        addVehicle: 'add launch vehicle',
        stats: 'statistics',
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
            default:
                break;
        }

        edom.findById('headline')?.setText(this.headlines[targetName]);
    }
}
