import { Div } from "../component/div";
import { StoneType } from "../stoneType";

export class Stone {
    stoneType: StoneType = StoneType.NONE;

    public generate(): HTMLElement {
        const stone = new Div('', `stone ${StoneType[this.stoneType]}_stone`).generate();
        return stone;
    }
}