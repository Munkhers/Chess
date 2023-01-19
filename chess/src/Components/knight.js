export function getKnightPossibleMoves(board, activeUnit) {
    let possibleMoveTiles = [];
    let possiblePwnTiles = [];

    let rIndex = activeUnit.rowIndex;
    let cIndex = activeUnit.colIndex;
    let color = board[activeUnit.rowIndex][activeUnit.colIndex].color;
    if (rIndex > 1) {
        if (cIndex > 0) {
            if (board[rIndex - 2][cIndex - 1].unit !== null) {
                if (board[rIndex - 2][cIndex - 1].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex - 1 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex - 1 });
            }
        }
        if (cIndex < 7) {
            if (board[rIndex - 2][cIndex + 1].unit !== null) {
                if (board[rIndex - 2][cIndex + 1].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex + 1 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex + 1 });
            }
        }
    }
    if (rIndex < 6) {
        if (cIndex > 0) {
            if (board[rIndex + 2][cIndex - 1].unit !== null) {
                if (board[rIndex + 2][cIndex - 1].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex - 1 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex - 1 });
            }
        }
        if (cIndex < 7) {
            if (board[rIndex + 2][cIndex + 1].unit !== null) {
                if (board[rIndex + 2][cIndex + 1].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex + 1 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex + 1 });
            }
        }
    }
    if (cIndex > 1) {
        if (rIndex > 0) {
            if (board[rIndex - 1][cIndex - 2].unit !== null) {
                if (board[rIndex - 1][cIndex - 2].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 2 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 2 });
            }
        }
        if (rIndex < 7) {
            if (board[rIndex + 1][cIndex - 2].unit !== null) {
                if (board[rIndex + 1][cIndex - 2].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 2 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 2 });
            }
        }
    }
    if (cIndex < 6) {
        if (rIndex > 0) {
            if (board[rIndex - 1][cIndex + 2].unit !== null) {
                if (board[rIndex - 1][cIndex + 2].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 2 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 2 });
            }
        }
        if (rIndex < 7) {
            if (board[rIndex + 1][cIndex + 2].unit !== null) {
                if (board[rIndex + 1][cIndex + 2].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 2 });
                }
            } else {
                possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 2 });
            }
        }
    }

    return {
        possibleMoveTiles: possibleMoveTiles,
        possiblePwnTiles: possiblePwnTiles
    }
}