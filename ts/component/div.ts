import { IHTMLElement } from "./IHTMLElement";

export class Div implements IHTMLElement {
    id:string;
    className:string;
    label:string;

    constructor(id: string = "", className:string = "", label:string = "") {
        this.id = id;
        this.className = className;
        this.label = label;
    }

    public generate():HTMLDivElement {
        const div:HTMLDivElement = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        div.innerText = this.label;
        return div;
    }
}