import { GRID_SIZE } from "../data/gameData";

export const createEmptyGrid = () =>
  Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0)
  );

export const cloneGrid = (grid) => grid.map((row) => [...row]);

const randomTileValue = () => (Math.random() < 0.9 ? 2 : 4);

export const addRandomTile = (grid) => {
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (grid[row][col] === 0) emptyCells.push([row, col]);
    }
  }

  if (!emptyCells.length) return grid;
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[x][y] = randomTileValue();
  return grid;
};

export const initializeGrid = () => {
  const grid = createEmptyGrid();
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const rotateGrid = (grid) => {
  const rotated = createEmptyGrid();
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      rotated[col][GRID_SIZE - 1 - row] = grid[row][col];
    }
  }
  return rotated;
};

const normalizeForDirection = (grid, direction) => {
  let transformed = cloneGrid(grid);
  let turns = 0;

  if (direction === "up") turns = 3;
  if (direction === "right") turns = 2;
  if (direction === "down") turns = 1;

  for (let index = 0; index < turns; index += 1) {
    transformed = rotateGrid(transformed);
  }

  return { transformed, turns };
};

const denormalizeGrid = (grid, turns) => {
  let transformed = cloneGrid(grid);
  const restoreTurns = (4 - turns) % 4;
  for (let index = 0; index < restoreTurns; index += 1) {
    transformed = rotateGrid(transformed);
  }
  return transformed;
};

const slideAndMergeRow = (row) => {
  const compact = row.filter((value) => value !== 0);
  const mergedRow = [];
  let scoreGained = 0;

  for (let index = 0; index < compact.length; index += 1) {
    if (compact[index] === compact[index + 1]) {
      const mergedValue = compact[index] * 2;
      mergedRow.push(mergedValue);
      scoreGained += mergedValue;
      index += 1;
    } else {
      mergedRow.push(compact[index]);
    }
  }

  while (mergedRow.length < GRID_SIZE) mergedRow.push(0);
  return { mergedRow, scoreGained };
};

export const hasMovesLeft = (grid) => {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const value = grid[row][col];
      if (value === 0) return true;
      if (row + 1 < GRID_SIZE && grid[row + 1][col] === value) return true;
      if (col + 1 < GRID_SIZE && grid[row][col + 1] === value) return true;
    }
  }
  return false;
};

export const moveGrid = (grid, direction) => {
  const { transformed, turns } = normalizeForDirection(grid, direction);
  const moved = createEmptyGrid();
  let scoreDelta = 0;
  let hasChanged = false;

  for (let row = 0; row < GRID_SIZE; row += 1) {
    const { mergedRow, scoreGained } = slideAndMergeRow(transformed[row]);
    moved[row] = mergedRow;
    scoreDelta += scoreGained;
    if (!hasChanged && mergedRow.some((v, idx) => v !== transformed[row][idx])) {
      hasChanged = true;
    }
  }

  return { grid: denormalizeGrid(moved, turns), scoreDelta, hasChanged };
};

export const getMaxTile = (grid) => Math.max(...grid.flat(), 0);
