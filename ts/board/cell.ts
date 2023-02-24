import { Common } from "../common";
import { Div } from "../component/div";
import { Const } from "../const";
import { BlackStone } from "../stone/blackStone";
import { Stone } from "../stone/Stone";
import { WhiteStone } from "../stone/whiteStone";
import { StoneType } from "../stoneType";

export class Cell {
    private x:number;
    private y:number;
    private cellElement: HTMLDivElement;
    private containerElement: HTMLElement;
    public stoneType: StoneType = StoneType.NONE;

    constructor(containerElement: HTMLElement, x:number, y:number) {
        this.containerElement = containerElement;
        this.x = x;
        this.y = y;
        this.cellElement = new Div(`${y}_${x}`, 'cell').generate();
        this.render();
        this.setClickEvent();
    }

    private render(): void {
        this.containerElement.appendChild(this.cellElement);
    }

    private getStone(stoneType: StoneType): Stone {
        switch (stoneType) {
            case StoneType.WHITE:
                return new WhiteStone();
            case StoneType.BLACK:
                return new BlackStone();
        }
        throw Error('Bad Request Exception!');
    }

    private setClickEvent():void {
        this.cellElement.addEventListener('click', () => { this.clickEvent(); });
    };

    private clickEvent(): void {
        if (!Common.placeable) { return; }
        if (this.stoneType !== StoneType.NONE) { return; }
        this.putStone(Common.getNextStoneType());
        setTimeout(() => {
            // 勝敗判定実行
        (<HTMLButtonElement>document.querySelector(`#${Const.JUDGEMENT_ID}`)).click();
        }, 100);
    }

    public putStone(stoneType: StoneType): void {
        this.stoneType = stoneType;
        const stone = this.getStone(stoneType);
        this.cellElement.appendChild(stone.generate());
        // 次の順番を予約
        Common.setNextStoneType();
    }
}