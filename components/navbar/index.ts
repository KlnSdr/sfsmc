class Navbar {
    private static currentFocusedElement: string = 'missions';
    static render() {
        // <footer>
        //     <button class="fas fa-satellite-dish active"></button>
        //     <button class="fab fa-connectdevelop"></button>
        //     <button class="fas fa-plus buttonCenter"></button>
        //     <button class="placeholder"></button>
        //     <button class="fas fa-rocket"></button>
        //     <button class="fas fa-chart-bar"></button>
        // </footer>

        edom.fromTemplate({
            children: [
                {
                    tag: 'footer',
                    children: [
                        {
                            id: 'missions',
                            tag: 'button',
                            classes: ['fas', 'fa-satellite-dish', 'active'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickHandlerSwitchContext',
                                    arguments: '',
                                    body: "Navbar.setFocus('missions'); Content.switchContext('missions')",
                                },
                            ],
                        },
                        {
                            id: 'constellations',
                            tag: 'button',
                            classes: ['fab', 'fa-connectdevelop'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickHandlerSwitchContext',
                                    arguments: '',
                                    body: "Navbar.setFocus('constellations'); Content.switchContext('constellations')",
                                },
                            ],
                        },
                        {
                            id: 'add',
                            tag: 'button',
                            classes: ['fas', 'fa-plus', 'buttonCenter'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickHandlerSwitchContext',
                                    arguments: '',
                                    body: 'Navbar.decideWhichAdd();',
                                },
                            ],
                        },
                        {
                            tag: 'button',
                            classes: ['placeholder'],
                        },
                        {
                            id: 'vehicles',
                            tag: 'button',
                            classes: ['fas', 'fa-rocket'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickHandlerSwitchContext',
                                    arguments: '',
                                    body: "Navbar.setFocus('vehicles'); Content.switchContext('vehicles')",
                                },
                            ],
                        },
                        {
                            id: 'stats',
                            tag: 'button',
                            classes: ['fas', 'fa-chart-bar'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickHandlerSwitchContext',
                                    arguments: '',
                                    body: "Navbar.setFocus('stats'); Content.switchContext('stats')",
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    static setFocus(targetID: string) {
        edom.findById(this.currentFocusedElement)?.removeStyle('active');
        if (targetID !== 'add') {
            edom.findById(targetID)?.applyStyle('active');
        }
        this.currentFocusedElement = targetID;
    }

    static decideWhichAdd() {
        if (this.currentFocusedElement === 'vehicles') {
            Content.switchContext('addVehicle');
        } else {
            Content.switchContext('addMission');
        }

        Navbar.setFocus('add');
    }
}
