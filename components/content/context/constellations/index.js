"use strict";
class Constellations {
    static render() {
        edom.fromTemplate([
            {
                tag: 'p',
                text: 'coming soon...',
                classes: ["constellations"]
            },
        ], edom.findById('content'));
    }
}
