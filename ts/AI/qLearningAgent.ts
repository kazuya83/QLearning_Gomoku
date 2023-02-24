import { Const } from "../const";
import { StoneType } from "../stoneType";
import { IAgent } from "./IAgent";
import qtable from "./qtable.json";

export class QLearningAgent implements IAgent {
    private epsilon:number;
    private alpha:number;
    private gamma:number;
    public qTable:any; // Q-table
    private numActions:number = Const.BOARD_SIZE**2;

    /**
     * Constructor
     * @param {number} epsilon ε-greedy法のε (0=1 デフォルト0.1)
     * @param {number} alpha 学習率 (0~1、デフォルト0.5)
     * @param {number} gamma 割引率 (0~1, デフォルト0.9)
     */
    constructor(epsilon:number = 0.1, alpha:number = 0.5, gamma:number = 0.9) {
        this.epsilon = epsilon;
        this.alpha = alpha;
        this.gamma = gamma;
        this.qTable = qtable; // jsonファイルから持ってくる
    }
    /**
     * 行動の選択
     * @param state 
     * @returns 
     */
    public getAction(state:any[]):number {
        if (Math.random() < this.epsilon) {
            console.log('ε-greedy法によるランダムな行動');
            // ε-greedy法によるランダムな行動
            console.log(this.getLegalActions(state));
            return this.getLegalActions(state)[Math.floor(Math.random() * this.getLegalActions(state).length)];
        }

        console.log('最適な行動を選ぶ');
        // 最適な行動を選ぶ
        let bestAction = -1;
        let bestValue:number = -Infinity;
        for (let action of this.getLegalActions(state)) {
            let value = this.getQValue(state, action);
            if (value > bestValue) {
              bestAction = action;
              bestValue = value;
            }
        }
        return bestAction;
    }

    /**
     * Q値の取得
     * @param {number[]} state 
     * @param {number} action 
     * @returns 
     */
    public getQValue(state:number[], action:number):number {
        const stateString = state.toString();
        if (!this.qTable.hasOwnProperty(stateString)) {
            this.qTable[stateString] = {};
        }
        if (!this.qTable[stateString].hasOwnProperty(action)) {
            this.qTable[stateString][action] = 0;
        }
        return this.qTable[stateString][action];
    }

    /**
     * Q値の更新
     * @param {number[]} state 現在の状態
     * @param {number} action 行動
     * @param {number[]} nextState 次の状態
     * @param {number} reward 報酬(勝ち:1, 引き分け:0, 負け:-1, まだ終わっていない:0, 既に置いてるところに置いた:-1)
     */
    public update(state:number[], action:number, nextState:any[], reward:number):void {
        const oldValue = this.getQValue(state, action);
        const nextStateActions = this.getLegalActions(nextState);
        if (nextStateActions.length === 0) {
            this.qTable[state.toString()][action] = (1 - this.alpha) * oldValue + this.alpha * reward;
        } else {
            let maxNextStateActionValue = -Infinity;
            for (let nextStateAction of nextStateActions) {
                let nextStateActionValue = this.getQValue(nextState, nextStateAction);
                if (nextStateActionValue > maxNextStateActionValue) {
                    maxNextStateActionValue = nextStateActionValue;
                }
            }
            this.qTable[state.toString()][action] = (1 - this.alpha) * oldValue + this.alpha * (reward + this.gamma * maxNextStateActionValue);
        }
    }

    /**
     * 行動の取得関数
     * @param {number[]} state 現在の状態
     */
    private getLegalActions(state:number[]) {
        const actions = [];
        for (let i = 0; i < this.numActions; i++) {
            if (state[i] === StoneType.NONE) {
                actions.push(i);
            }
        }
        return actions;
    }
}