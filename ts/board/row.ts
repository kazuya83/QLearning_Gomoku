import { Div } from "../component/div";
import { Const } from "../const";
import { Cell } from "./cell";
import asEnumerable from 'linq-es5';
import { StoneType } from "../stoneType";

export class Row{
    private y:number;
    private containerElement: HTMLElement;
    private rowElement: HTMLElement;
    public cellList:Cell[] = [];

    constructor(containerElement: HTMLElement, y:number) {
        this.y = y;
        this.containerElement = containerElement;
        this.rowElement = new Div(`board_row_${y}`, 'board-row').generate();
        this.render();
    }

    private render():void {
        this.containerElement.appendChild(this.rowElement);
        for (let i = 0; i < Const.BOARD_SIZE; i++) {
            const cell = new Cell(this.rowElement, i, this.y);
            this.cellList.push(cell);
        }
    }

    public getRowInfo():StoneType[] {
        const rowInfo:StoneType[] = asEnumerable(this.cellList).Select(cell => cell.stoneType).ToArray();
        return rowInfo;
    }
}