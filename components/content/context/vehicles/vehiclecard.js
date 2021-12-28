"use strict";
class VehicleCard {
    constructor(data, missionID) {
        this.vehicleName = data.name;
        this.isReusable = data.isReusable;
        this.thrustAtLiftoff = data.tal;
        this.stages = data.stages;
        this.ID = missionID;
    }
    instruction() {
        const self = this;
        return {
            tag: 'div',
            classes: ['missionCard'],
            handler: [
                {
                    type: 'click',
                    id: 'clickOpenMissionDetails',
                    arguments: '',
                    body: `Vehicles.openDetails(${this.ID})`,
                },
            ],
            children: [
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
                                            tag: 'h3',
                                            text: this.vehicleName,
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        this.createBadge(this.isReusable),
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
                                            tag: 'p',
                                            text: 'stages: ' +
                                                this.stages.toString(),
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'p',
                                            text: 'thrust: ' +
                                                pointify(this.thrustAtLiftoff.toString()) +
                                                't',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    createBadge(isReusable) {
        return {
            tag: 'div',
            classes: ['badge'],
            children: [
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
                                            tag: 'p',
                                            text: isReusable
                                                ? 'reusable'
                                                : 'expendable',
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'div',
                                            classes: [
                                                'circle',
                                                isReusable
                                                    ? 'reusable'
                                                    : 'expendable',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
