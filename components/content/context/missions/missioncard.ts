class MissionCard {
    missionName: string;
    orbitedBody: string;
    launchVehicle: string;
    apogee: string;
    perigee: string;
    missionStatus: string;
    missionType: string;

    ID: number;

    constructor(data: Mission, missionID: number) {
        this.missionName = data.name;
        this.orbitedBody = data.body;
        this.launchVehicle = data.vehicle;
        this.apogee = data.apogee.toString();
        this.perigee = data.perigee.toString();
        this.missionStatus = data.status;
        this.missionType = data.type;

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
                    body: `Missions.openDetails(${this.ID})`,
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
                                            text: this.missionName,
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        this.createBadge(this.missionStatus),
                                        this.createBadge(this.missionType),
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
                                            text: this.orbitedBody,
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'p',
                                            text:
                                                'a: ' +
                                                pointify(this.apogee) +
                                                'km',
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
                                            tag: 'p',
                                            text: this.launchVehicle,
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'p',
                                            text:
                                                'p: ' +
                                                pointify(this.perigee) +
                                                'km',
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

// TODO put somewhere else
function pointify(input: string): string {
    let output: string = '';
    const splitted: string[] = input.split('');

    for (let i = splitted.length - 1; i >= 0; i--) {
        output = splitted[i] + output;
        if (
            (splitted.length - i) % 3 === 0 &&
            splitted.length - i < splitted.length - 1
        ) {
            output = ',' + output;
        }
    }

    return output;
}
