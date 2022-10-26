import "source-map-support/register";
import dotenv from "dotenv";
import { ConnectionHandler } from "./ConnectionHandler/ConnectionHandler";
import { CommandState } from "./models/Command";
dotenv.config();

console.log("Started");
let player = {
  id: 0,
  name: "MeBot",
};

const ws = ConnectionHandler({
  url: process.env.WS_URL + "",
  onMessage(cmd) {
    switch (cmd.Cmd) {
      case CommandState.GO: //play
        break;
      case CommandState.PLAY: //log
        // add the new play to the log
        break;
      case CommandState.SIGN: //sign
        if (cmd.Val === 1) {
          //playerID abspeichern
          player.id = cmd.Player;
          console.log("Signed up as ", cmd.Comment);
        }
        break;
      case CommandState.RESULT: //result
        ws.close();
        break;
    }
  },
});
