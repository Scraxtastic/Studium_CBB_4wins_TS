import WebSocket from "ws";
import { CommandState, ICommand } from "../models/Command";

export interface IConnectionHandlerProps {
  url: string;
  onOpen?: () => void;
  onMessage: (data: ICommand) => void;
  onClose?: () => void;
}

export const ConnectionHandler = (props: IConnectionHandlerProps) => {
  const connection = new WebSocket(props.url);
  if (props.onOpen) connection.on("open", props.onOpen);
  if (props.onMessage)
    connection.on("message", (data) => {
        const cmd : ICommand = JSON.parse(data.toString());
        props.onMessage(cmd);
    });
  if (props.onClose) connection.on("close", props.onClose);
  return connection;
};
