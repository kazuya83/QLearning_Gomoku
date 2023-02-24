import { IHTMLElement } from "./IHTMLElement";

export class Label implements IHTMLElement {
    id: string;
    className: string;
    label: string;

    constructor(label:string, id:string = "", className:string = "") {
        this.id = id;
        this.className = className;
        this.label = label;
    }

    public generate():HTMLLabelElement {
        const label = document.createElement('label');
        label.id = this.id;
        label.className = this.className;
        label.textContent = this.label;
        return label;
    }
}