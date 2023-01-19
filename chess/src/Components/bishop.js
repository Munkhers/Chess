export function getBishopPossibleMoves(board, activeUnit) {
    let possibleMoveTiles = [];
    let possiblePwnTiles = [];

    let rIndex = activeUnit.rowIndex;
    let cIndex = activeUnit.colIndex;
    let color = board[activeUnit.rowIndex][activeUnit.colIndex].color;

    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
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