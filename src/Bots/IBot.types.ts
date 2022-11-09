export interface IBot{
    name: string;
    calcTurn: (gameState: number[][]) => number;
}

export interface ISuggestion{

    existing: IPoint[];
    expected: IPoint;
    loss: boolean;
}

export interface IPoint{
    x: number;
    y: number;
}