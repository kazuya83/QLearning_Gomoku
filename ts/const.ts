export class Const {
    public static BOARD_SIZE:number = 10;

    public static NEXT_STONE_TYPE:string = 'next_stone_type';

    public static PLACEABLE:string = 'placeable';

    public static JUDGEMENT_ID:string = 'judgement_id';

    // 上、下、左、右、左上、左下、右上、右下
    public static dx:number[] = [0, 0, -1, 1, -1, -1, 1, 1];
    public static dy:number[] = [-1, 1, 0, 0, -1, 1, -1, 1];
}