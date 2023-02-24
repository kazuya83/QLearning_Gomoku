import { Const } from "./const";
import { Stone } from "./stone/Stone";
import { StoneType } from "./stoneType";

export class Common {
    public static placeable:boolean = (localStorage.getItem(Const.PLACEABLE) ?? "1") === "1";

    public static disPlaceable():void {
        localStorage.setItem(Const.PLACEABLE, '0');
    }

    public static activePlaceable():void {
        localStorage.setItem(Const.PLACEABLE, '1');
    }

    public static getNextStoneType(): StoneType {
        const stoneTypeNumber = Number(localStorage.getItem(Const.NEXT_STONE_TYPE) ?? StoneType.WHITE);
        return stoneTypeNumber === StoneType.WHITE ? StoneType.WHITE : StoneType.BLACK;
    }

    public static setNextStoneType(): void {
        localStorage.setItem(Const.NEXT_STONE_TYPE, (this.getNextStoneType() === StoneType.WHITE ? StoneType.BLACK : StoneType.WHITE).toString());
    }

    public static removeChildrenElement(targetElement:HTMLElement) {
        while(targetElement.firstChild ){
            targetElement.removeChild(targetElement.firstChild);
        }
    }

    public static convertActionToArray(action:number):number[] {
        const x = Math.floor(action%Const.BOARD_SIZE);
        const y = Math.floor(action/Const.BOARD_SIZE);
        return [x, y];
    }
}