import { getOpenColumns, getRandomFromArr } from "./BotUtil";
import { IBot } from "./IBot.types"

export const createRandomBot = (name: string): IBot => {
    const calcTurn = (gameState: number[][]): number => {
        return getRandomFromArr(getOpenColumns(gameState));
    }

    const bot: IBot = {
        name: "rando-" + name,
        calcTurn,
        counts: {}
    }
    return bot;
}