import { Board } from "../board/board";
import { Judgment } from "../judgment/judgment";
import { StoneType } from "../stoneType";
import { IAgent } from "./IAgent";

export class Trainer {
    private agent: IAgent;
    private game: Board;

    constructor(agent:IAgent, game:Board) {
        this.agent = agent;
        this.game = game;
    }

    /**
     * 学習
     * @param numEpisodes 
     */
    public train(numEpisodes:number) {
        for (let i = 0; i < numEpisodes; i++) {
            this.game.resetTraining();
            let state:any[] = Object.assign([], this.game.getStateForAI());
            let stone = StoneType.WHITE;
            let rewardSum = 0;
            let done = false;
            while (!done) {
                const action = this.agent.getAction(state);
                const isPut = this.game.step(action, stone);
                let reward = 0;
                if (!isPut) { 
                    rewardSum--;
                    this.agent.update(state, action, state, -1);
                    continue;
                }

                const judgement = new Judgment();
                const result = judgement.judge(this.game.trainingList);
                if (result === StoneType.NONE) {
                    reward = 0;
                } else if (result === StoneType.BLACK) {
                    rewardSum++;
                    reward = 1;
                    done = true;
                    console.log('勝利');
                } else {
                    rewardSum--;
                    reward = -1;
                    done = true;
                    console.log('敗北');
                }
                const nextState = Object.assign([], this.game.getStateForAI());
                this.agent.update(state, action, nextState, reward)
                state = this.game.getStateForAI();
                stone = stone === StoneType.WHITE ? StoneType.BLACK : StoneType.WHITE;
            }
            console.log(`Episode ${i+1} finished. Score: ${rewardSum}`);
        }
        console.log(JSON.stringify(this.agent.qTable));
        console.log("Training finished.");
    }
}