class Content {
    static render() {
        edom.fromTemplate({
            children: [
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
    }
}
