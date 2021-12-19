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
                            text: 'missions',
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

    static switchContext(targetName: string) {
        edom.findById('content')?.clear();
        Dropdown.removeDropdowns();

        switch (targetName) {
            case 'missions':
                break;
            case 'add':
                edom.fromTemplate(
                    Dropdown.instruction('launch vehicle', [
                        'Jupiter I',
                        'Jupiter II',
                        'Jupiter III',
                        'Jupiter IV',
                        'Seth',
                    ]),
                    edom.findById('content')
                );
                break;
            default:
                break;
        }

        edom.findById('headline')?.setText(this.headlines[targetName]);
    }
}
