// interfaces =======================================================================================
interface handlerObject {
    [id: string]: () => void;
}

interface edomObj extends Object {
    [key: string]: any;
}
// edomError ========================================================================================
class edomElementNullExeption {
    message: string;
    constructor(message: string) {
        this.message = message;
        console.error(message);
    }
}
// edom =============================================================================================
class edom {
    static body: edomElement;
    static allElements: Array<edomElement>;

    static init() {
        edom.allElements = [];

        edom.body = edom.fromExisting(document.body);
        edom.body.id = 'body';
    }

    static newElement(
        tagname: string
    ):
        | edomElement
        | edomInputElement
        | edomAnchorElement
        | edomListElement
        | edomImageElement {
        switch (tagname.toLowerCase()) {
            case 'input':
                const elmnt: edomInputElement = new edomInputElement(
                    false,
                    tagname
                ) as edomInputElement;
                elmnt.addChange('onInput', (self: edomInputElement) => {
                    self.value = (self.element as HTMLInputElement).value;
                });
                return elmnt;

            case 'textarea':
                const ta: edomTAElement = new edomInputElement(
                    false,
                    tagname
                ) as edomTAElement;
                ta.addChange('onInput', (self: edomTAElement) => {
                    self.value = (self.element as HTMLTextAreaElement).value;
                });
                return ta;
            case 'a':
                return new edomAnchorElement(false, tagname);
            case 'ul':
            case 'ol':
                return new edomListElement(false, tagname);
            case 'img':
                return new edomImageElement(false, tagname);
            default:
                return new edomElement(false, tagname);
        }
    }

    static fromExisting(element: HTMLElement) {
        edom.iterateChildren(element);
        return new edomElement(true, '', element);
    }

    private static iterateChildren(element: HTMLElement) {
        edom.getChildren(element).forEach((child: Element) => {
            console.log(child);
        });
    }

    private static getChildren(element: HTMLElement): Array<Element> {
        return Array.from(element.children);
    }

    static findById(id: string): edomElement | undefined {
        var toReturn: edomElement | undefined;
        edom.allElements.forEach((element: edomElement) => {
            if (element.id === id) {
                toReturn = element;
            }
        });

        return toReturn;
    }

    static break() {
        return edom.newElement('br');
    }

    static fromTemplate(template: edomObj, parent: edomElement | null = null) {
        if (parent === null) {
            if (template.classes != undefined) {
                edom.body.applyStyle(...template.classes);
            }
            this.fromTemplate(template.children, edom.body);
        } else {
            for (let i = 0; i < template.length; i++) {
                const currentChild: edomElement = edom.newElement(
                    template[i].tag
                );
                if (template[i].id != undefined) {
                    currentChild.id = template[i].id;
                }
                if (template[i].text != undefined) {
                    currentChild.setText(template[i].text);
                }
                if (template[i].type != undefined) {
                    (currentChild as edomInputElement).setType(
                        template[i].type
                    );
                }
                if (template[i].classes != undefined) {
                    currentChild.applyStyle(...template[i].classes);
                }
                if (template[i].src != undefined) {
                    (currentChild as edomImageElement).setSrc(template[i].src);
                }
                if (template[i].target != undefined) {
                    (currentChild as edomAnchorElement).href(
                        template[i].target
                    );
                }
                if (template[i].handler != undefined) {
                    template[i].handler.forEach((handler: edomObj) => {
                        currentChild.addEvent(
                            handler.type,
                            handler.id,
                            new Function(handler.arguments, handler.body) as (
                                self: edomElement
                            ) => any
                        );
                    });
                }
                parent.addChild(currentChild);

                if (template[i].children != undefined) {
                    this.fromTemplate(template[i].children, currentChild);
                }
            }
        }
    }
}
// edomElement ======================================================================================
class edomElement {
    rawElement: HTMLElement;
    element: HTMLElement;
    children: Array<edomElement> = [];
    text: string = '';
    parent: edomElement | undefined;
    classes: string[] = [];
    tag: string;

    private _id: string;
    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    private handlers: handlerObject = {};

    private values: edomObj = {};

    constructor(
        fromExisting: boolean,
        tagname: string,
        existingElement: HTMLElement | null = null
    ) {
        this._id = Math.random().toString() + Math.random().toString();
        if (fromExisting === true) {
            if (existingElement === null) {
                throw new edomElementNullExeption('Given Element is null');
            } else {
                this.element = existingElement!;
                this.rawElement = this.element;
            }
        } else {
            this.element = document.createElement(tagname);
            this.rawElement = this.element;
        }
        edom.allElements.push(this);
        this.tag = tagname;
        return this;
    }

    addChild(child: edomElement) {
        this.children.push(child);
        this.element.appendChild(child.rawElement);
        child.parent = this;
    }

    setText(text: string) {
        this.text = text;
        this.element.innerText = this.text;
    }

    setValue(key: string, value: any) {
        this.values[key] = value;
    }

    getValue(key: string): any {
        return this.values[key];
    }

    addClick(identifier: string, func: (self: this) => any) {
        this.addEvent('click', identifier, func);
    }

    doClick() {
        this.rawElement.click();
    }

    deleteClick(identifier: string) {
        this.deleteEvent('click', identifier);
    }

    addEvent(type: string, identifier: string, action: (self: this) => any) {
        const hdlr: () => void = () => {
            action(this);
        };
        this.handlers[identifier] = hdlr;

        this.element.addEventListener(type, hdlr);
    }

    deleteEvent(type: string, identifier: string) {
        this.element.removeEventListener(type, this.handlers[identifier]);
    }

    applyStyle(...className: string[]) {
        className.forEach((_class: string) => {
            this.element.classList.add(_class);
            this.classes.push(_class);
        });
    }

    removeStyle(...className: string[]) {
        className.forEach((_class: string) => {
            this.element.classList.remove(_class);

            const index: number = this.classes.indexOf(_class);
            if (index > -1) {
                this.classes.splice(index, 1);
            }
        });
    }

    hasStyle(...className: string[]): boolean {
        var hasStyle: boolean = true;

        className.forEach((_class: string) => {
            if (!this.classes.includes(_class)) {
                hasStyle = false;
            }
        });
        return hasStyle;
    }

    swapStyle(oldClass: string, newClass: string) {
        this.removeStyle(oldClass);
        this.applyStyle(newClass);
    }

    clear() {
        this.element.innerHTML = '';
        this.children = [];
    }

    delete(isChild: boolean = false): boolean {
        if (isChild === false) {
            if (this.parent !== undefined) {
                for (let i = 0; i < this.parent!.children.length; i++) {
                    if (this.parent!.children[i].id === this.id) {
                        this.parent!.children.splice(i, 1);
                    }
                }
            }
        }

        for (let i = 0; i < edom.allElements.length; i++) {
            if (edom.allElements[i].id === this.id) {
                edom.allElements.splice(i, 1);
            }
        }

        this.children.forEach((child: edomElement) => {
            child.delete(true);
        });
        this.element.remove();
        for (var key in this) delete this[key];
        return true;
    }
    // TODO programmatischer machen -> nicht über Klasse in css, sondern z.B Eigenschaft von element?
    enable() {
        this.swapStyle('hidden', 'visible');
    }
    // TODO programmatischer machen -> nicht über Klasse in css, sondern z.B Eigenschaft von element?
    disable() {
        this.swapStyle('visible', 'hidden');
    }

    break() {
        this.addChild(edom.break());
    }

    focus() {
        this.element.focus();
    }
}
// edomInputElement =================================================================================
class edomInputElement extends edomElement {
    value: string = '';
    type: string = 'text';

    addChange(identifier: string, func: (self: this) => any) {
        this.addEvent('input', identifier, (self) => {
            func(self);
        });
    }

    deleteChange(identifier: string) {
        this.deleteEvent('input', identifier);
    }

    setType(_type: string) {
        this.type = _type;
        (this.element as HTMLInputElement).type = _type;
    }

    setContent(text: string) {
        (this.element as HTMLInputElement).value = text;
        this.value = text;
    }

    select() {
        (this.element as HTMLInputElement).select();
    }
}

class edomTAElement extends edomInputElement {
    setContent(text: string) {
        (this.element as HTMLTextAreaElement).value = text;
        this.value = text;
    }
}
// edomAnchorElement ================================================================================
class edomAnchorElement extends edomElement {
    target: string = '';

    href(location: string) {
        this.target = location;
        (this.element as HTMLAnchorElement).href = this.target;
    }
}
// edomListElement ==================================================================================
class edomListElement extends edomElement {
    addEntry(text: string) {
        const anstrich: edomElement = edom.newElement('li');
        anstrich.setText(text);

        this.addChild(anstrich);
    }

    addEntryLink(text: string, target: string): void;
    addEntryLink(text: string, clickHandler: (self: edomElement) => void): void;

    addEntryLink(
        text: string,
        doOnClick: string | ((self: edomElement) => void)
    ) {
        const anstrich: edomElement = edom.newElement('li');

        const link: edomAnchorElement = edom.newElement(
            'a'
        ) as edomAnchorElement;
        link.setText(text);

        if (typeof doOnClick === 'string') {
            link.href(doOnClick);
        } else if (typeof doOnClick === 'function') {
            link.addClick('', () => {
                doOnClick(link);
            });

            link.href('javascript:void(0);');
        }

        anstrich.addChild(link);
        this.addChild(anstrich);
    }
}
// edomImageElement ==================================================================================
class edomImageElement extends edomElement {
    src: string = '';
    setSrc(src: string) {
        this.src = src;
        (this.element as HTMLImageElement).src = this.src;
    }
}
