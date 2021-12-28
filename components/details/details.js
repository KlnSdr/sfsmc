"use strict";
class Details {
    static show(header = '', footer = [], content = [], onShow = () => { }) {
        edom.fromTemplate([
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
        ], edom.body);
        const modal = edom.findById('myModal');
        modal.element.style.display = 'block';
        onShow();
        edom.body.rawElement.style.overflow = 'hidden';
    }
    static close() {
        var _a;
        (_a = edom.findById('myModal')) === null || _a === void 0 ? void 0 : _a.delete();
        edom.body.rawElement.style.overflow = '';
    }
}
