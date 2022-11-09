import { getOpenColumns, getRandomFromArr, getVerticalSuggestions } from "./BotUtil"
import { IBot } from "./IBot.types"

export const createRandomBotThinks = (name: string): IBot => {
    const counts = {
        "random": 0,
        "vertical": 0,
    }
    const calcTurn = (gameState: number[][]): number => {
        const vSuggestions = getVerticalSuggestions(gameState);
        if (vSuggestions.length > 0) {
            console.log(name, "Vsuggestions", vSuggestions);
            counts.vertical++;
            return vSuggestions[0].expected.x;
        };
        console.log(name, "Random");
        counts.random++;
        return getRandomFromArr(getOpenColumns(gameState));
    }

    const bot: IBot = {
        name: "randot-" + name,
        calcTurn,
        counts
    }
    return bot;
}