class Content {
    static render() {
        edom.fromTemplate({
            children: [
                {
                    tag: 'div',
                    classes: ['content'],
                },
            ],
        });
    }

    static switchContext(targetName: string) {
        console.log(targetName);
    }
}
