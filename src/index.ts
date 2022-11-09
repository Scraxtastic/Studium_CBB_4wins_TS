import "source-map-support/register";
import dotenv from "dotenv";
import { CreateConnectionHandler } from "./ConnectionHandler/ConnectionHandler";
import {
  ILobbyEvent,
  IncomingEventStates,
  OutgoingEventState,
} from "./models/Events";
import { BotProfile, IBot } from "./Bots/IBot.types";
import { createRandomBot } from "./Bots/RandoBot";
import { createRandomBotThinks } from "./Bots/RandoBotThinks";
dotenv.config();

console.log("Started");
let player = {
  id: Math.floor(Math.random() * 963248),
  name: "",
};
let lobby = {
  LobbyName: "challenge-1",
  LobbyPassword: "ch1",
};
let gameState: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
let gameServer: string = "";
let botToActivate: BotProfile = 1;
let activeBot: IBot;


const con = CreateConnectionHandler({
  url: process.env.WS_URL + "",
});

const launch = () => {
  con.send(OutgoingEventState.LOGIN_REQUEST, { PlayerUID: "_"+player.id });
};

con.on(IncomingEventStates.LOGIN_INFO, (ev: ILobbyEvent) => {
  console.log("Login Info: ", ev);
  con.send(OutgoingEventState.LOBBY_JOIN_REQUEST, lobby);
});

con.on(IncomingEventStates.LOBBY_JOIN_INFO, (ev: ILobbyEvent) => {
  console.log("Joined Lobby", ev);
});

con.on(IncomingEventStates.LOBBY_START, (ev: ILobbyEvent) => {
  console.log("Lobby Started", ev);
  gameServer = ev.Data.GameServer;
});

con.on(IncomingEventStates.GAME_START, (ev: ILobbyEvent) => {
  console.log("Game Started", ev);
  switch (botToActivate) {
    case BotProfile.Random:
      activeBot = createRandomBot(player.name + player.id);
      break;
    case BotProfile.RandomThinks:
      activeBot = createRandomBotThinks(player.name + player.id);
      break;
    default:
      activeBot = createRandomBot(player.name + player.id);
  }
});

con.on(IncomingEventStates.TURN_REQUEST, (ev: ILobbyEvent) => {
  // Send Turn
  console.log("Turn Requested", ev);
  // Create new Play for every run (for the start);

  con.sendTurn(gameServer, activeBot.calcTurn(gameState));
});

con.on(IncomingEventStates.TURN_INFO, (ev: ILobbyEvent) => {
  // Save game state
  console.log("Turn Info", ev);

  gameState = ev.Data.GameState;
});

con.on(IncomingEventStates.GAME_END, (ev: ILobbyEvent) => {
  console.log("GAme End", ev);

  // create new game
  // Must not do anything
});

con.on(IncomingEventStates.LOBBY_END, (ev: ILobbyEvent) => {
  console.log("Lobby End", ev);

  con.connection.close();
});

con.connection.on("open", () => {
  console.log("Connection Opened");

  launch();
});
