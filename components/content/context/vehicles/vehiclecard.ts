class VehicleCard {
    vehicleName: string;
    isReusable: boolean;
    thrustAtLiftoff: number;
    stages: number;
    status: string;

    ID: number;

    constructor(data: Vehicle, missionID: number) {
        this.vehicleName = data.name;
        this.isReusable = data.isReusable;
        this.thrustAtLiftoff = data.tal;
        this.stages = data.stages;
        this.status = data.status;

        this.ID = missionID;
    }

    instruction(): edomObj {
        const self: this = this;
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
                                        this.createBadge(
                                            this.isReusable
                                                ? 'reusable'
                                                : 'expendable'
                                        ),
                                        this.createBadge(this.status),
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
                                            text:
                                                'stages: ' +
                                                this.stages.toString(),
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'p',
                                            text:
                                                'thrust: ' +
                                                pointify(
                                                    this.thrustAtLiftoff.toString()
                                                ) +
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

    createBadge(text: string): edomObj {
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
                                            text: text,
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'div',
                                            classes: ['circle', text],
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
