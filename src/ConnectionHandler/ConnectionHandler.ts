import WebSocket from "ws";
import {
  IncomingEventStates,
  OutgoingEventState,
  ILobbyEvent,
} from "../models/Events";

export interface IConnectionHandlerProps {
  url: string;
}

export interface IConnectionHandler {
  connection: WebSocket;
  on: Function;
  send: (event: OutgoingEventState, data: any) => void;
  sendTurn: (gameServer: string, columnId: number) => void;
}

export const CreateConnectionHandler = (props: IConnectionHandlerProps) => {
  const connection: WebSocket = new WebSocket(props.url);
  const events = {};
  const on = (event: IncomingEventStates, method: Function) => {
    if (!events[event]) events[event] = [];
    events[event].push(method);
  };
  connection.on("message", (data) => {
    const cmd: ILobbyEvent = JSON.parse(data.toString());

    if (events[cmd.Event]) {
      events[cmd.Event][0](cmd);
    }
  });
  const sendTurn = (gameServer: string, columnId: number) => {
    const eventToSend: ILobbyEvent = {
      Event: OutgoingEventState.TURN,
      Target: gameServer,
      Data: {
        Column: columnId,
      },
    };
    console.log("Sending Turn - ", eventToSend);
    connection.send(JSON.stringify(eventToSend));
  };

  const send = (event: OutgoingEventState, data: any) => {
    const eventToSend: ILobbyEvent = {
      Event: event.toString(),
      Data: data,
    };

    console.log("Sending", eventToSend);
    connection.send(JSON.stringify(eventToSend));
  };
  const out: IConnectionHandler = { connection, on, send, sendTurn };
  return out;
};
