import { Board } from "../board/board";
import { Cell } from "../board/cell";
import { Common } from "../common";
import { Const } from "../const";
import { StoneType } from "../stoneType";
import { IAgent } from "./IAgent";

export class AI {
    private board: Board;
    private agent: IAgent; 

    constructor(agent: IAgent, board: Board) {
        this.agent = agent;
        this.board = board;
    }

    /**
     * AIが次の手を実行する
     */
    public execute():void {
        if (!Common.placeable) { return; }
        Common.disPlaceable();
        this.putStone();
    }

    /**
     * 実際に石を置く操作
     */
    private putStone():void {
        const stoneType = Common.getNextStoneType();
        const targetCell = this.getNextPutCell();
        targetCell.putStone(stoneType);
        Common.activePlaceable();
    }

    /**
     * 強化学習Agentから次おくセルを取得
     * @returns 
     */
    private getNextPutCell():Cell {
        const action = this.agent.getAction(this.board.getState());
        if (action < 0) { return this.getNextPutCell(); }
        const actionArr = Common.convertActionToArray(action);
        const x = actionArr[0];
        const y = actionArr[1];
        const row = this.board.rowList[y];
        const cell = row.cellList[x];
        if (cell.stoneType === StoneType.NONE) {
            return cell;
        }
        return this.getNextPutCell();
    }
}