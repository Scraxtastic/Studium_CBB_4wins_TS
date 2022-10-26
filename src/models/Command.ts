export enum CommandState {
    "RESULT",
    "GO",
    "PLAY",
    "SIGN"
}

// ICommand s are coming from an API
export interface ICommand{
    Cmd : CommandState;
    Player: number;
    Val: number;
    Comment: string;
}