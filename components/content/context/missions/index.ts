class Missions {
    static render() {
        edom.fromTemplate(Missions.generateCards(), edom.findById('content'));
    }

    private static generateCards(): obj[] {
        const missions: obj = Datahandler.getData('missions');
        let cards: obj[] = [];

        for (let i = missions.currentID; i >= 0; i--) {
            if (missions[i.toString()].type !== '[removed]') {
                cards.push(
                    new MissionCard(missions[i.toString()], i).instruction()
                );
            }
        }

        return cards;
    }

    static openDetails(missionID: number) {
        const missionData: Mission = Datahandler.getData('missions')[missionID];
        Details.show(
            missionData.name,
            [
                {
                    tag: 'button',
                    text: 'delete mission',
                    classes: ['detailsButton', 'delete'],
                    handler: [
                        {
                            type: 'click',
                            id: 'clickDeleteMission',
                            arguments: '',
                            body: `Missions.delete(${missionID})`,
                        },
                    ],
                },
                {
                    tag: 'button',
                    text: 'edit mission',
                    classes: ['detailsButton'],
                },
            ],
            [
                {
                    tag: 'ul',
                    children: [
                        {
                            tag: 'li',
                            text: 'orbited body: ' + missionData.body,
                        },
                        {
                            tag: 'li',
                            text: 'launch vehicle: ' + missionData.vehicle,
                        },
                        {
                            tag: 'li',
                            text: 'status: ' + missionData.status,
                        },
                        {
                            tag: 'li',
                            text: 'type: ' + missionData.type,
                        },
                        {
                            tag: 'li',
                            text:
                                'apogee: ' +
                                pointify(missionData.apogee.toString()) +
                                'km',
                        },
                        {
                            tag: 'li',
                            text:
                                'perigee: ' +
                                pointify(missionData.perigee.toString()) +
                                'km',
                        },
                    ],
                },
            ]
        );
    }

    static delete(missionID: number) {
        if (confirm('are you sure you want to delete this mission?')) {
            const missionsData: obj = Datahandler.getData('missions');
            missionsData[missionID.toString()] = { type: '[removed]' };

            Datahandler.saveData('missions', missionsData);
            Details.close();
            edom.findById('missions')?.doClick();
        }
    }
}
