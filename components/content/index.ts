class Content {
    private static headlines: { [key: string]: string } = {
        missions: 'missions',
        constellations: 'constellations',
        add: 'add mission',
        vehicles: 'launch vehicles',
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
            case 'add':
                AddMission.render(
                    options.egg !== undefined ? options.egg : Egg.dontCare
                );
                break;
            default:
                break;
        }

        edom.findById('headline')?.setText(this.headlines[targetName]);
    }
}
