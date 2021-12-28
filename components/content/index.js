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
        var _a, _b;
        (_a = edom.findById('content')) === null || _a === void 0 ? void 0 : _a.clear();
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
            default:
                break;
        }
        (_b = edom.findById('headline')) === null || _b === void 0 ? void 0 : _b.setText(this.headlines[targetName]);
    }
}
Content.headlines = {
    missions: 'missions',
    constellations: 'constellations',
    addMission: 'add mission',
    vehicles: 'launch vehicles',
    addVehicle: 'add launch vehicle',
    stats: 'statistics',
};
