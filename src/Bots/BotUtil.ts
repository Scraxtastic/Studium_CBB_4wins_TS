import { ISuggestion } from "./IBot.types";

export const getOpenColumns = (gameState: number[][]): number[] => {
  let openColumns = [];
  for (let i = 0; i < gameState[0].length; i++) {
    if (gameState[0][i] === 0) {
      openColumns.push(i);
    }
  }
  return openColumns;
};

export const getRandomFromArr = (arr: any[]): any => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getVerticalSuggestions = (
  gameState: number[][]
): ISuggestion[] => {
  let suggestions: ISuggestion[] = [];
  let openColumns = getOpenColumns(gameState);
  for (let i = 0; i < openColumns.length; i++) {
    let currentSuggestion: ISuggestion = {
      existing: [],
      expected: { x: 0, y: 0 },
      loss: false,
    };
    let expectedValue = 0;
    let placeIndex = -1;
    for (let j = 0; j < gameState.length; j++) {
      let currentValue = gameState[j][openColumns[i]];
      if (currentValue === 0) continue;
      if(placeIndex < 0) placeIndex = j-1;
      if (expectedValue == 0 || currentValue == expectedValue) {
        currentSuggestion.existing.push({ x: j, y: openColumns[i] });
        expectedValue = currentValue;
      }
    }
    if (currentSuggestion.existing.length !== 3)continue;
     currentSuggestion.loss = true;
    currentSuggestion.expected={x:openColumns[i],y:gameState.length};
    if (currentSuggestion.loss) continue;
    suggestions.push(currentSuggestion);
  }
  return suggestions;
};
