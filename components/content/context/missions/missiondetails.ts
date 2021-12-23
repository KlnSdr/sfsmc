class Details {
    static show(
        header: string = '',
        footer: obj = [],
        content: obj = [],
        onShow: () => void = () => {}
    ) {
        edom.fromTemplate(
            [
                {
                    tag: 'div',
                    id: 'myModal',
                    classes: ['modal'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['modal-content'],
                            children: [
                                {
                                    tag: 'div',
                                    classes: ['modal-header'],
                                    children: [
                                        {
                                            tag: 'span',
                                            classes: [
                                                'close',
                                                'fa',
                                                'fa-times',
                                            ],
                                            id: 'closeModal',
                                            handler: [
                                                {
                                                    type: 'click',
                                                    id: 'closeModal',
                                                    arguments: '',
                                                    body: 'Details.close();',
                                                },
                                            ],
                                        },
                                        {
                                            tag: 'h3',
                                            text: header,
                                        },
                                    ],
                                },
                                {
                                    tag: 'div',
                                    classes: ['modal-body'],
                                    children: content,
                                },
                                {
                                    tag: 'div',
                                    classes: ['modal-footer'],
                                    children: [
                                        {
                                            tag: 'h3',
                                            children: footer,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            edom.body
        );

        const modal: edomElement = edom.findById('myModal')!;
        modal.element.style.display = 'block';

        onShow();
    }

    static close() {
        edom.findById('myModal')?.delete();
    }
}
