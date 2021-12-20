class AddMission {
    static render() {
        edom.fromTemplate(
            [
                Input.instruction('mission name:', 'txtMissionName'),
                Input.instruction('acronyms:', 'txtAcronyms'),
                Dropdown.instruction('launch vehicle', [
                    // todo load from localStorage
                    'Jupiter I',
                    'Jupiter II',
                    'Jupiter III',
                    'Jupiter IV',
                    'Seth',
                ]),
                Dropdown.instruction('mission status', [
                    'active',
                    'destroyed',
                    'deorbited',
                    'graveyard',
                    'planned',
                ]),
                Dropdown.instruction('mission type', [
                    'orbital',
                    Math.random() > 0.9 ? 'blue origin' : 'suborbital',
                ]),
                Dropdown.instruction('orbited body', [
                    'none',
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
                },
            ],
            edom.findById('content')
        );
    }
}
