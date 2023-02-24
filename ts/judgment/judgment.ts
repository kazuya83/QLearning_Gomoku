import { Board } from "../board/board";
import { Common } from "../common";
import { Const } from "../const";
import { StoneType } from "../stoneType";
import { DerectionType } from "./derectionType";

export class Judgment {
    private readonly dx:number[] = Const.dx;
    private readonly dy:number[] = Const.dy;

    constructor() {
    }

    public judge(boardInfo:any[]):StoneType {
        // 白勝敗判定
        if (this.searchSerise5(boardInfo, StoneType.WHITE)) {
            Common.disPlaceable();
            return StoneType.WHITE;
        }
        // 黒勝敗判定
        if (this.searchSerise5(boardInfo, StoneType.BLACK)) {
            Common.disPlaceable();
            return StoneType.BLACK;
        }
        
        return StoneType.NONE;
    }

    private searchSerise5(boardInfo:any[], stoneType:StoneType):boolean {
        let isSerise5 = false;
        this.getTargetDirectionTypeList().forEach(d => {
            const derectionId = this.getTargetDirectionIdx(d);
            if (this.searchMaxSeries(boardInfo, stoneType, this.dx[derectionId], this.dy[derectionId]) >= 5) {
                isSerise5 = true;
                return isSerise5;
            }
        });
        return isSerise5;
    }

    private searchMaxSeries(boardInfo:any[], stoneType:StoneType, dx: number, dy: number) {
        let maxSeries = 0;
        const searchedList:any[] = this.generateSearchedList();
        for (let i = 0; i < Const.BOARD_SIZE; i++) {
            for (let j = 0; j < Const.BOARD_SIZE; j++) {
                if (searchedList[j][i]) { continue; }
                const serise = this.searchTargetPosMaxSeries(boardInfo, stoneType, i, j, dx, dy, searchedList);
                maxSeries = serise > maxSeries ? serise : maxSeries;
            }
        }
        return maxSeries;
    }

    private searchTargetPosMaxSeries(boardInfo:any[], stoneType:StoneType, x:number, y:number, dx:number, dy:number, searchedList:any[], series:number = 1):number {
        if (boardInfo[y][x] !== stoneType) { return 0; }
        searchedList[y][x] = true;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= Const.BOARD_SIZE) { return series; }
        if (ny < 0 || ny >= Const.BOARD_SIZE) { return series; }
        if (boardInfo[ny][nx] !== stoneType) { return series; }
        searchedList[nx][ny] = true;
        return this.searchTargetPosMaxSeries(boardInfo, stoneType, nx, ny, dx, dy, searchedList, series+1);
    }

    private generateSearchedList():any[] {
        return Object.assign([], new Array(Const.BOARD_SIZE).fill(Object.assign([], new Array(Const.BOARD_SIZE).fill(false))));
    };

    private getTargetDirectionIdx(derectionType:DerectionType):number {
        switch (derectionType) {
            case DerectionType.VERTICAL:
                return 1;
            case DerectionType.BESIDE:
                return 3;
            case DerectionType.BOTTOMLEFT:
                return 5;
            case DerectionType.BOTTOMRIGHT:
                return 7;
        }
    }

    private getTargetDirectionTypeList():DerectionType[] {
        return [DerectionType.VERTICAL, DerectionType.BESIDE, DerectionType.BOTTOMRIGHT, DerectionType.BOTTOMLEFT];
    }
}