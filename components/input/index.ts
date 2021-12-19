class Input {
    static instruction(text: string, id: string, type: string = 'text') {
        return {
            tag: 'div',
            classes: ['textInput'],
            children: [
                {
                    tag: 'i',
                    classes: ['fas', 'fa-pen'],
                },
                {
                    tag: 'label',
                    text: text,
                },
                {
                    tag: 'input',
                    type: type,
                    id: id,
                },
            ],
        };
    }
}
