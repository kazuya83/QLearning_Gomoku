import { IHTMLElement } from "./IHTMLElement";

export class Button implements IHTMLElement {
    id:string;
    className:string;
    label:string;
    
    constructor(id: string, className: string, label:string, ) {
        this.id = id;
        this.className = className;
        this.label = label;
    }

    public generate(): HTMLButtonElement {
        const button:HTMLButtonElement = document.createElement('button');
        button.type = 'button';
        button.id = this.id;
        button.innerHTML = this.label;
        button.className = this.className;
        return button;
    }
}