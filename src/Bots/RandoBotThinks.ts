import {
    getDiagonalSuggestions,
  getHorizontalSuggestions,
  getOpenColumns,
  getRandomFromArr,
  getVerticalSuggestions,
} from "./BotUtil";
import { IBot } from "./IBot.types";

export const createRandomBotThinks = (name: string): IBot => {
  const counts = {
    random: 0,
    vertical: 0,
    horizontal: 0,
    diagonal: 0,
  };
  let player = -1;
  let enemy = -1;
  const calcTurn = (gameState: number[][]): number => {
    if (player < 0) return -1;
    //Winning positions
    const vSuggestions = getVerticalSuggestions(gameState, player);
    if (vSuggestions.length > 0) {
      console.log(name, "Vsuggestions", vSuggestions);
      counts.vertical++;
      return vSuggestions[0].expected.x;
    }

    const hSuggestions = getHorizontalSuggestions(gameState, player);
    if (hSuggestions.length > 0) {
      console.log(name, "Hsuggestions", hSuggestions);
      counts.horizontal++;
      return hSuggestions[0].expected.x;
    }

    const dSuggestions = getDiagonalSuggestions(gameState, player);
    if (dSuggestions.length > 0) {
      console.log(name, "Dsuggestions", dSuggestions);
      counts.diagonal++;
      return dSuggestions[0].x;
    }

    //Loosing positions
    const vSuggestionsE = getVerticalSuggestions(gameState, enemy);
    if (vSuggestionsE.length > 0) {
      console.log(name, "VsuggestionsE", vSuggestionsE);
      counts.vertical++;
      return vSuggestionsE[0].expected.x;
    }

    const hSuggestionsE = getHorizontalSuggestions(gameState, enemy);
    if (hSuggestionsE.length > 0) {
      console.log(name, "Hsuggestions", hSuggestionsE);
      counts.horizontal++;
      return hSuggestionsE[0].expected.x;
    }
    
    const dSuggestionsE = getDiagonalSuggestions(gameState, enemy);
    if (dSuggestionsE.length > 0) {
      console.log(name, "Dsuggestions", dSuggestionsE);
      counts.diagonal++;
      return dSuggestionsE[0].x;
    }
    console.log(name, "Random");
    counts.random++;
    return getRandomFromArr(getOpenColumns(gameState));
  };

  const bot: IBot = {
    name: "randot-" + name,
    calcTurn,
    counts,
    player,
    enemy,
  };
  return bot;
};
