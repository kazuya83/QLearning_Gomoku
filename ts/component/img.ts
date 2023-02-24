import { IHTMLElement } from "./IHTMLElement";

export class Img implements IHTMLElement {
    id: string;
    className: string;
    src: string;

    constructor(src: string, id: string = "", className: string = "") {
        this.src = src;
        this.id = id;
        this.className = className;
    }

    public generate():HTMLImageElement {
        const img: HTMLImageElement = document.createElement('img');
        img.src = this.src;
        img.id = this.id;
        img.className = this.className;
        return img;
    }
}