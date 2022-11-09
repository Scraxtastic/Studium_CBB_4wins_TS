import { getOpenColumns, getRandomFromArr, getVerticalSuggestions } from "./BotUtil"
import { IBot } from "./IBot.types"

export const createRandomBotThinks = (name: string): IBot => {
    const calcTurn = (gameState: number[][]): number => {
        const vSuggestions = getVerticalSuggestions(gameState);
        if (vSuggestions.length > 0) {
            return vSuggestions[0].expected.x;
        }
        return getRandomFromArr(getOpenColumns(gameState));
    }

    const bot: IBot = {
        name: "randot-" + name,
        calcTurn
    }
    return bot;
}