import { Div } from "./div";
import { IHTMLElement } from "./IHTMLElement";
import { Label } from "./label";

export class Checkbox implements IHTMLElement {
    id: string;
    className:string;
    label:string;

    constructor(id: string, className:string, label:string) {
        this.id = id;
        this.className = className;
        this.label = label;
    }

    public generate():HTMLDivElement {
        const checkboxContainer:HTMLDivElement = new Div().generate();
        const checkbox:HTMLInputElement = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = this.id;
        checkbox.className = this.className;
        checkboxContainer.appendChild(checkbox);

        const checkboxLabel:HTMLLabelElement = new Label(this.label).generate();
        checkboxLabel.htmlFor = this.id;
        checkboxContainer.appendChild(checkboxLabel);
        return checkboxContainer;
    }
}