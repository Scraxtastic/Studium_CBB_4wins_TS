import { IPoint, ISuggestion } from "./IBot.types";

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
  gameState: number[][],
  playerId: number
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
      if (playerId === 0) continue;
      if (placeIndex < 0) placeIndex = j - 1;
      if (expectedValue == 0 || playerId == expectedValue) {
        currentSuggestion.existing.push({ x: j, y: openColumns[i] });
        expectedValue = playerId;
      }
    }
    if (currentSuggestion.existing.length !== 3) continue;
    currentSuggestion.loss = true;
    currentSuggestion.expected = { x: openColumns[i], y: gameState.length };
    if (currentSuggestion.loss) continue;
    suggestions.push(currentSuggestion);
  }
  return suggestions;
};

export const getHorizontalSuggestions = (
  gameState: number[][],
  playerId: number
): ISuggestion[] => {
  let suggestions: ISuggestion[] = [];
  let openColumns = getOpenColumns(gameState);
  for (let i = 0; i < gameState.length; i++) {
    const currentSuggestion: ISuggestion = {
      existing: [],
      expected: { x: 0, y: 0 },
      loss: false,
    };
    for (let j = 0; j < openColumns.length; j++) {
      if (playerId === 0) continue;
      if (currentSuggestion.existing.length === 0) {
        currentSuggestion.existing.push({ x: i, y: openColumns[j] });
      } else {
        let expectedValue = currentSuggestion.existing[0].x;
        if (playerId === expectedValue) {
          currentSuggestion.existing.push({ x: i, y: openColumns[j] });
        } else {
          currentSuggestion.existing = [];
          currentSuggestion.existing.push({ x: i, y: openColumns[j] });
        }
      }
      if (currentSuggestion.existing.length === 3) {
        currentSuggestion.expected = {
          x: openColumns[j],
          y: i,
        };
        currentSuggestion.loss = true;
        break;
      }
    }
  }
  return suggestions;
};

export const getDiagonalSuggestions = (
  gameState: number[][],
  playerNr: number
): IPoint[] => {
  let suggestions: IPoint[] = [];
  if (
    gameState[5][0] == playerNr &&
    gameState[4][1] == playerNr &&
    gameState[3][2] == playerNr &&
    gameState[2][3] == 0 &&
    gameState[3][3] != 0
  ) {
    suggestions.push({ x: 3, y: 2 });
  }
  if (
    gameState[5][1] == playerNr &&
    gameState[4][2] == playerNr &&
    gameState[3][3] == playerNr &&
    gameState[2][4] == 0 &&
    gameState[3][4] != 0
  ) {
    suggestions.push({ x: 4, y: 2 });
  }
  if (
    gameState[5][2] == playerNr &&
    gameState[4][3] == playerNr &&
    gameState[3][4] == playerNr &&
    gameState[2][5] == 0 &&
    gameState[3][5] != 0
  ) {
    suggestions.push({ x: 5, y: 2 });
  }
  if (
    gameState[5][3] == playerNr &&
    gameState[4][4] == playerNr &&
    gameState[3][5] == playerNr &&
    gameState[2][6] == 0 &&
    gameState[3][6] != 0
  ) {
    suggestions.push({ x: 6, y: 2 });
  }
  //row 4 towards right
  if (
    gameState[4][0] == playerNr &&
    gameState[3][1] == playerNr &&
    gameState[2][2] == playerNr &&
    gameState[1][3] == 0 &&
    gameState[2][3] != 0
  ) {
    suggestions.push({ x: 3, y: 1 });
  }
  if (
    gameState[4][1] == playerNr &&
    gameState[3][2] == playerNr &&
    gameState[2][3] == playerNr &&
    gameState[1][4] == 0 &&
    gameState[2][4] != 0
  ) {
    suggestions.push({ x: 4, y: 1 });
  }
  if (
    gameState[4][2] == playerNr &&
    gameState[3][3] == playerNr &&
    gameState[2][4] == playerNr &&
    gameState[1][5] == 0 &&
    gameState[2][5] != 0
  ) {
    suggestions.push({ x: 5, y: 1 });
  }
  if (
    gameState[4][3] == playerNr &&
    gameState[3][4] == playerNr &&
    gameState[2][5] == playerNr &&
    gameState[1][6] == 0 &&
    gameState[2][6] != 0
  ) {
    suggestions.push({ x: 6, y: 1 });
  }
  //row 4 towards right
  if (
    gameState[3][0] == playerNr &&
    gameState[2][1] == playerNr &&
    gameState[1][2] == playerNr &&
    gameState[0][3] == 0 &&
    gameState[1][3] != 0
  ) {
    suggestions.push({ x: 3, y: 0 });
  }
  if (
    gameState[3][1] == playerNr &&
    gameState[2][2] == playerNr &&
    gameState[1][3] == playerNr &&
    gameState[0][4] == 0 &&
    gameState[1][4] != 0
  ) {
    suggestions.push({ x: 4, y: 0 });
  }
  if (
    gameState[3][2] == playerNr &&
    gameState[2][3] == playerNr &&
    gameState[1][4] == playerNr &&
    gameState[0][5] == 0 &&
    gameState[1][5] != 0
  ) {
    suggestions.push({ x: 5, y: 0 });
  }
  if (
    gameState[3][3] == playerNr &&
    gameState[2][4] == playerNr &&
    gameState[1][5] == playerNr &&
    gameState[0][6] == 0 &&
    gameState[1][6] != 0
  ) {
    suggestions.push({ x: 6, y: 0 });
  }
  //row 5 towards left
  if (
    gameState[5][6] == playerNr &&
    gameState[4][5] == playerNr &&
    gameState[3][4] == playerNr &&
    gameState[2][3] == 0 &&
    gameState[3][3] != 0
  ) {
    suggestions.push({ x: 3, y: 2 });
  }
  if (
    gameState[5][5] == playerNr &&
    gameState[4][4] == playerNr &&
    gameState[3][3] == playerNr &&
    gameState[2][2] == 0 &&
    gameState[3][2] != 0
  ) {
    suggestions.push({ x: 2, y: 2 });
  }
  if (
    gameState[5][4] == playerNr &&
    gameState[4][3] == playerNr &&
    gameState[3][2] == playerNr &&
    gameState[2][1] == 0 &&
    gameState[3][1] != 0
  ) {
    suggestions.push({ x: 1, y: 2 });
  }
  if (
    gameState[5][3] == playerNr &&
    gameState[4][2] == playerNr &&
    gameState[3][1] == playerNr &&
    gameState[2][0] == 0 &&
    gameState[3][0] != 0
  ) {
    suggestions.push({ x: 0, y: 2 });
  }
  //row 4 towards left
  if (
    gameState[4][6] == playerNr &&
    gameState[3][5] == playerNr &&
    gameState[2][4] == playerNr &&
    gameState[1][3] == 0 &&
    gameState[2][3] != 0
  ) {
    suggestions.push({ x: 3, y: 1 });
  }
  if (
    gameState[4][5] == playerNr &&
    gameState[3][4] == playerNr &&
    gameState[2][3] == playerNr &&
    gameState[1][2] == 0 &&
    gameState[2][2] != 0
  ) {
    suggestions.push({ x: 2, y: 1 });
  }
  if (
    gameState[4][4] == playerNr &&
    gameState[3][3] == playerNr &&
    gameState[2][2] == playerNr &&
    gameState[1][1] == 0 &&
    gameState[2][1] != 0
  ) {
    suggestions.push({ x: 1, y: 1 });
  }
  if (
    gameState[4][3] == playerNr &&
    gameState[3][2] == playerNr &&
    gameState[2][1] == playerNr &&
    gameState[1][0] == 0 &&
    gameState[2][0] != 0
  ) {
    suggestions.push({ x: 0, y: 1 });
  }
  //row 3 towards left
  if (
    gameState[3][6] == playerNr &&
    gameState[2][5] == playerNr &&
    gameState[1][4] == playerNr &&
    gameState[0][3] == 0 &&
    gameState[1][3] != 0
  ) {
    suggestions.push({ x: 3, y: 0 });
  }
  if (
    gameState[3][5] == playerNr &&
    gameState[2][4] == playerNr &&
    gameState[1][3] == playerNr &&
    gameState[0][2] == 0 &&
    gameState[1][2] != 0
  ) {
    suggestions.push({ x: 2, y: 0 });
  }
  if (
    gameState[3][4] == playerNr &&
    gameState[2][3] == playerNr &&
    gameState[1][2] == playerNr &&
    gameState[0][1] == 0 &&
    gameState[1][1] != 0
  ) {
    suggestions.push({ x: 1, y: 0 });
  }
  if (
    gameState[3][3] == playerNr &&
    gameState[2][2] == playerNr &&
    gameState[1][1] == playerNr &&
    gameState[0][0] == 0 &&
    gameState[1][0] != 0
  ) {
    suggestions.push({ x: 0, y: 0 });
  }
  return suggestions;
};
