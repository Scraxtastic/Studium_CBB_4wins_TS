# 4 wins server protocol

url: ws://solver4all.com:8123/conPlayer
webview: http://solver4all.com:8124/

## LobbyEvent

- Event
- Source
- Target // GameServer from LOBBY_START Event
- Data

### Events

- LOGIN_REQUEST //Login into the lobby
- LOBBY_INFO
- LOBBY_JOIN_REQUEST // Joining the lobby game
- LOBBY_JOIN_INFO
- LOBBY_START
- GAME_START
- TURN_REQUEST // It's definitely your turn, if you receive it
- TURN
- TURN_INFO
- GAME_END
- LOBBY_END //Kills connection afterwards

### Data

{
LobbyName: string,
LobbyPassword: string,
PlayerUID: string,
PlayerPosition: number, // Position of the player array for the current Lobby (LobbyName)
GameServer: string, // UUID, must be given in turns
Players: string[],
Column: number,
}

## WebSocket Steps

//Lobby Handling till start
-> {Event: LOGIN_REQUEST, Data: {playerUID: string}}
<- {Event: LOGIN_INFO, Data: {status: string}}
-> {Event: LOBBY_JOIN_REQUEST, Data: {LobbyName: string, LobbyPassword: string}}
<- {Event: LOBBY_JOIN_INFO, Data: {PlayerUID: string, PlayerPosition: number}}
<- {Event: LOBBY_START, Data: {Players: string[], Rounds: 5, GameServer: string}}
<- {Event: GAME_START, Data: {Players: string[]}}

//GamePlay
<- {Event: TURN_REQUEST, Data: {PlayerUID}} 
-> {Event: TURN, Target: string, Data: {Column: number}}
<- {Event: TURN_INFO, Data: {PlayerUID: string, playerPosition: number, TurnID: number, Status: string, Comment: string, Column: number, GameState: [[]]}}

//After Game
<- {Event: GAME_END, Data: {Players: string[], scores: number[]}}

// After All Games
<- {Event: LOBBY_END, Data: {Players: string[], scroes: number[]}}


