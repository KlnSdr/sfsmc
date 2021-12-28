"use strict";
class Content {
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
    static switchContext(targetName, options = {}) {
        var _a, _b, _c;
        // check if current context is the same as next to save ressources
        if (((_a = edom.findById('headline')) === null || _a === void 0 ? void 0 : _a.text) === this.headlines[targetName] &&
            options.forceReload === undefined) {
            return;
        }
        (_b = edom.findById('content')) === null || _b === void 0 ? void 0 : _b.clear();
        Dropdown.removeDropdowns();
        switch (targetName) {
            case 'missions':
                Missions.render();
                break;
            case 'addMission':
                AddMission.render(options.egg !== undefined ? options.egg : Egg.dontCare);
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
        (_c = edom.findById('headline')) === null || _c === void 0 ? void 0 : _c.setText(this.headlines[targetName]);
    }
}
Content.headlines = {
    missions: 'missions',
    constellations: 'constellations',
    addMission: 'add mission',
    vehicles: 'launch vehicles',
    addVehicle: 'add launch vehicle',
    stats: 'statistics',
    settings: 'settings',
};
