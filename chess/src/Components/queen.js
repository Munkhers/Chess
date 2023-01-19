export function getQueenPossibleMoves(board, activeUnit) {
    let possibleMoveTiles = [];
    let possiblePwnTiles = [];

    let rIndex = activeUnit.rowIndex;
    let cIndex = activeUnit.colIndex;
    let color = board[activeUnit.rowIndex][activeUnit.colIndex].color;

    for (let rowIndex = rIndex; rowIndex >= 0; rowIndex--) {
        if (rowIndex !== rIndex) {
            if (board[rowIndex][cIndex].unit !== null) {
                if (board[rowIndex][cIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
        }
    }

    for (let rowIndex = rIndex; rowIndex <= 7; rowIndex++) {
        if (rowIndex !== rIndex) {
            if (board[rowIndex][cIndex].unit !== null) {
                if (board[rowIndex][cIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
        }
    }

    for (let colIndex = cIndex; colIndex >= 0; colIndex--) {
        if (colIndex !== cIndex) {
            if (board[rIndex][colIndex].unit !== null) {
                if (board[rIndex][colIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rIndex, colIndex: colIndex });
        }
    }

    for (let colIndex = cIndex; colIndex <= 7; colIndex++) {
        if (colIndex !== cIndex) {
            if (board[rIndex][colIndex].unit !== null) {
                if (board[rIndex][colIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rIndex, colIndex: colIndex });
        }
    }

    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
        if (rowIndex !== rIndex && colIndex !== cIndex) {
            if (board[rowIndex][colIndex].unit !== null) {
                if (board[rowIndex][colIndex].color !== color) {
                    possiblePwnTiles = [...possiblePwnTiles, { rowIndex: rowIndex, colIndex: colIndex }]
                }
                break;
            }
            possibleMoveTiles = [...possibleMoveTiles, { rowIndex: rowIndex, colIndex: colIndex }]
        }
    }

    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex <= 7; rowIndex++, colIndex++) {
        if (rowIndex !== rIndex && colIndex !== cIndex) {
            if (board[rowIndex][colIndex].unit !== null) {
                if (board[rowIndex][colIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
        }
    }

    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex >= 0; rowIndex++, colIndex--) {
        if (rowIndex !== rIndex && colIndex !== cIndex) {
            if (board[rowIndex][colIndex].unit !== null) {
                if (board[rowIndex][colIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
        }
    }

    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex <= 7; rowIndex--, colIndex++) {
        if (rowIndex !== rIndex && colIndex !== cIndex) {
            if (board[rowIndex][colIndex].unit !== null) {
                if (board[rowIndex][colIndex].color !== color) {
                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                }
                break;
            }
            possibleMoveTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
        }
    }

    return {
        possibleMoveTiles: possibleMoveTiles,
        possiblePwnTiles: possiblePwnTiles
    }
}