class Statistics {
    static render() {
        edom.fromTemplate(
            [
                {
                    tag: 'p',
                    text: 'coming soon...',
                    classes: ['stats'],
                },
            ],
            edom.findById('content')
        );
    }
}
