import { Common } from "../common";
import { Div } from "../component/div";
import { Const } from "../const";
import { Stone } from "../stone/Stone";
import { StoneType } from "../stoneType";
import { Row } from "./row";

export class Board {
    private boardElement: HTMLElement;
    private containerElement:HTMLElement;
    public rowList:Row[] = [];
    public trainingList:any[] = []; // 強化学習用データ(画面にレンダリングしたくないので)

    constructor(containerElement:HTMLElement) {
        this.boardElement = new Div('board', 'board').generate();
        this.containerElement = containerElement;
    }

    public render():void {
        this.containerElement.appendChild(this.boardElement);
        for (let i = 0; i < Const.BOARD_SIZE; i++) {
            const row = new Row(this.boardElement, i);
            this.rowList.push(row);
        }
    }

    public getBoardInfo() {
        const boardInfo:any[] = [];
        this.rowList.forEach(row => {
            boardInfo.push(row.getRowInfo());
        });
        return boardInfo;
    }

    public getState():StoneType[] {
        return  this.getBoardInfo().flat();
    }

    /**
     * 強化学習用リセット
     */
    public resetTraining():void {
        this.trainingList = Object.assign([], new Array(Const.BOARD_SIZE).fill(Object.assign(new Array(Const.BOARD_SIZE).fill(StoneType.NONE))));
    }

    public getStateForAI():StoneType[] {
        return this.trainingList.flat();
    }

    public step(action:number, stoneType:StoneType):boolean {
        const actionArr = Common.convertActionToArray(action);
        const x = actionArr[0];
        const y = actionArr[1];
        if (this.trainingList[y][x] !== StoneType.NONE) {
            return false;
        }
        this.trainingList[y][x] = stoneType;
        return true;
    }
}