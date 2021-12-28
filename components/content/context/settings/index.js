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
                        src: '../../../../favicon.svg',
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
                                                text: `v${this.versionNumber} - ${this.rlab}`,
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
}
Settings.versionNumber = '1.1.1';
Settings.rlab = 'i just wanne test';
