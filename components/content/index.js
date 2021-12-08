"use strict";
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
    static switchContext(targetName) {
        var _a;
        (_a = edom.findById('content')) === null || _a === void 0 ? void 0 : _a.clear();
        Dropdown.removeDropdowns();
        switch (targetName) {
            case 'add':
                edom.fromTemplate(Dropdown.instruction('launch vehicle', [
                    'Jupiter I',
                    'Jupiter II',
                    'Jupiter III',
                    'Jupiter IV',
                    'Seth',
                ]), edom.findById('content'));
                break;
            default:
                break;
        }
    }
}
