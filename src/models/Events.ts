export enum IncomingEventStates{
    LOGIN_INFO="LOGIN_INFO",
    LOBBY_JOIN_INFO="LOBBY_JOIN_INFO",
    LOBBY_START="LOBBY_START",
    GAME_START="GAME_START",
    TURN_REQUEST="TURN_REQUEST",
    TURN_INFO="TURN_INFO",
    GAME_END="GAME_END",
    LOBBY_END="LOBBY_END",
}

export enum OutgoingEventState{
    LOGIN_REQUEST="LOGIN_REQUEST",
    LOBBY_JOIN_REQUEST="LOBBY_JOIN_REQUEST",
    TURN="TURN",

}

// ICommand s are coming from an API
export interface ILobbyEvent{
    Event: IncomingEventStates | OutgoingEventState | string;
    Source?: string;
    Target?: string;
    Data: any;
}