export interface IAgent {
    qTable:any;
    getAction(state:any[]):number;
    update(state:any[], action:number, nextState:any[], reward:number):void;
}