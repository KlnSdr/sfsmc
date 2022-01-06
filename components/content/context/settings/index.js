"use strict";
class Settings {
    static render() {
        edom.fromTemplate([
            {
                tag: 'div',
                classes: ['settingsContainer'],
                children: [
                    {
                        tag: 'img',
                        src: './favicon.svg',
                    },
                    {
                        tag: 'table',
                        children: [
                            {
                                tag: 'tr',
                                children: [
                                    {
                                        tag: 'td',
                                        children: [
                                            {
                                                tag: 'button',
                                                text: 'create snapshot',
                                                classes: [
                                                    'detailsButton',
                                                    'settingsButton',
                                                ],
                                                handler: [
                                                    {
                                                        type: 'click',
                                                        id: 'clickCreateSnapshot',
                                                        arguments: '',
                                                        body: 'Settings.createSnapshot();',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        tag: 'td',
                                        children: [
                                            {
                                                tag: 'button',
                                                text: 'clear all data',
                                                classes: [
                                                    'detailsButton',
                                                    'settingsButton',
                                                    'delete',
                                                ],
                                                handler: [
                                                    {
                                                        type: 'click',
                                                        id: 'clickDeleteData',
                                                        arguments: '',
                                                        body: 'Settings.resetData();',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                tag: 'tr',
                                children: [
                                    {
                                        tag: 'td',
                                        children: [
                                            {
                                                tag: 'label',
                                                text: `v${this.versionNumbers[this.versionNumbers.length - 1]} - ${this.rlab[this.rlab.length - 1]}`,
                                            },
                                        ],
                                    },
                                    {
                                        tag: 'td',
                                        children: [
                                            {
                                                tag: 'a',
                                                text: 'code on GitHub',
                                                target: 'https://github.com/KlnSdr/sfsmc',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'div',
                children: [
                    {
                        tag: 'div',
                        classes: ['settingsContainer'],
                        children: [
                            {
                                tag: 'p',
                                text: 'changelog',
                                classes: ['headlineChangelog']
                            },
                            {
                                tag: 'ul',
                                children: this.generateLog()
                            }
                        ]
                    }
                ]
            },
        ], edom.findById('content'));
    }
    static resetData() {
        if (confirm('this will permanently delete all missions and vehicles you have created.')) {
            Datahandler.initStore();
            Details.show('', [
                {
                    tag: 'button',
                    text: 'ok',
                    classes: ['detailsButton', 'settingsButton'],
                    handler: [
                        {
                            type: 'click',
                            id: 'clickCloseDialog',
                            arguments: '',
                            body: 'Details.close();',
                        },
                    ],
                },
            ], [
                {
                    tag: 'p',
                    text: 'all missions and vehicles where deleted',
                    classes: ['settingsConfirmText'],
                },
            ]);
        }
    }
    static createSnapshot() {
        let snapshotLink = document.URL + 'recover/?data=';
        let store = {};
        store['missions'] = Datahandler.getData('missions');
        store['vehicles'] = Datahandler.getData('vehicles');
        snapshotLink += btoa(JSON.stringify(store));
        Details.show('', [
            {
                tag: 'button',
                text: 'copy link',
                classes: ['detailsButton', 'settingsButton'],
                handler: [
                    {
                        type: 'click',
                        id: 'clickCloseDialog',
                        arguments: 'self',
                        body: `Settings.copyLink("${snapshotLink}", self)`,
                    },
                ],
            },
        ], [
            {
                tag: 'p',
                classes: ['settingsConfirmText', 'underline'],
                text: snapshotLink.substring(0, 50) + '...',
            },
        ]);
    }
    static copyLink(payload, self) {
        navigator.clipboard.writeText(payload).then(() => {
            self.setText('copied');
        }, () => {
            self.setText('something is wrong, i can feel it');
        });
    }
    static generateLog() {
        let changelog = [];
        for (let i = this.versionNumbers.length - 1; i >= 0; i--) {
            changelog.push({
                tag: 'li',
                children: [
                    {
                        tag: 'p',
                        text: `v${this.versionNumbers[i]} - ${this.rlab[i]}`
                    },
                    {
                        tag: 'ul',
                        children: this.changes[i].map((change) => {
                            return {
                                tag: 'li',
                                text: change,
                                classes: ['change']
                            };
                        })
                    }
                ]
            });
        }
        return changelog;
    }
}
Settings.versionNumbers = [
    '0.0.1',
    '1.0.0',
    '1.1.1',
    '1.1.2',
    '1.1.3',
    '1.2.0',
    '1.2.1',
    '1.3.0',
];
Settings.rlab = [
    'just a test',
    'still testing',
    'i just wanna test',
    'i just wanna test',
    'i just wanna test',
    "ain't nothin' but a test",
    "ain't nothin' but a test",
    "loggin' on heaven's door",
];
Settings.changes = [
    ['testing deployment configuration'],
    ['initial deployment'],
    ['added settings', 'added "create snapshot"', 'added "clear all data"', 'fixed bugs'],
    ['fixed bug'],
    ['actually fixed bug'],
    ['added development status to vehicles'],
    ['only active and planned vehicles will be displayed when planning a new mission'],
    ['added changelog'],
];
