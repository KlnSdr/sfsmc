class Missions {
    static render() {
        edom.fromTemplate(Missions.generateCards(), edom.findById('content'));
    }

    private static generateCards(): obj[] {
        const missions: obj = Datahandler.getData('missions');
        let cards: obj[] = [];

        for (let i = missions.currentID; i >= 0; i--) {
            cards.push(new MissionCard(missions[i.toString()]).instruction());
        }

        return cards;
    }
}