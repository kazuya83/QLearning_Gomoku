import { IHTMLElement } from "./IHTMLElement";

export class Hidden implements IHTMLElement {
    id: string;
    className: string;
    value: string;

    constructor(id: string, className: string, value: string) {
        this.id = id;
        this.className = className;
        this.value = value;
    }

    public generate():HTMLInputElement {
        const hidden:HTMLInputElement = document.createElement('input');
        hidden.type = 'hidden';
        hidden.id = this.id;
        hidden.className = this.className;
        hidden.value = this.value;
        return hidden;
    }
}