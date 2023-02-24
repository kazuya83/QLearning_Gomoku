import { AI } from "./AI/AI";
import { IAgent } from "./AI/IAgent";
import { QLearningAgent } from "./AI/qLearningAgent";
import { Trainer } from "./AI/Trainer";
import { Board } from "./board/board";
import { Common } from "./common";
import { Button } from "./component/button";
import { Const } from "./const";
import { Judgment } from "./judgment/judgment";
import { StoneType } from "./stoneType";
let board:Board;
let judgement:Judgment;
let ai:AI;
let agent:IAgent;

window.addEventListener('DOMContentLoaded', () => {
    const app:HTMLElement = document.querySelector('#app') ?? new HTMLElement();
    selector(app);
});

const selector = (container:HTMLElement) => {
    const gameSelect = new Button('', '', 'ゲーム実行').generate();
    gameSelect.addEventListener('click', () => { gameStart(); });
    container.appendChild(gameSelect);
    const aiSelect = new Button('', '', '教科学習').generate();
    aiSelect.addEventListener('click', () => { train(); });
    container.appendChild(aiSelect);
};

const gameStart = () => {
    const agent = new QLearningAgent();
    localStorage.removeItem(Const.NEXT_STONE_TYPE);
    Common.activePlaceable();
    const app:HTMLElement = document.querySelector('#app') ?? new HTMLElement();
    Common.removeChildrenElement(app);
    board = new Board(app);
    board.render();
    judgement = new Judgment();
    ai = new AI(agent, board);
    generateJudgementButton();
}

const train = () => {
    const agent = new QLearningAgent();
    const app:HTMLElement = document.querySelector('#app') ?? new HTMLElement();
    const trainer = new Trainer(agent, new Board(app));
    trainer.train(100000);
};

const generateJudgementButton = () => {
    const judgementButton = new Button(Const.JUDGEMENT_ID, '', '').generate();
    judgementButton.style.display = 'none';
    judgementButton.addEventListener('click', () => {
        const winStone = judgement.judge(board.getBoardInfo());
        if (winStone !== StoneType.NONE) {
            alert(`${StoneType[winStone]}の勝ち`);
            return;
        }
        // AIモードの時
        if (true) {
            ai.execute();
        }
    });
    document.body.appendChild(judgementButton);
};