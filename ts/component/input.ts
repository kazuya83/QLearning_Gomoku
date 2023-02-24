import { IHTMLElement } from "./IHTMLElement";

export class Input implements IHTMLElement {
    id: string;
    className: string;
    value: string

    constructor(id: string, className:string, value:string = "") {
        this.id = id;
        this.className = className;
        this.value = value;
    }

    public generate():HTMLInputElement {
        const input:HTMLInputElement = document.createElement('input');
        input.type = 'text';
        input.id = this.id;
        input.className = this.className;
        input.value = this.value;
        return input;
    }
}