export function getKingPossibleMoves(board, activeUnit) {
    let possibleMoveTiles = [];
    let possiblePwnTiles = [];

    let rIndex = activeUnit.rowIndex;
    let cIndex = activeUnit.colIndex;

    let color = board[activeUnit.rowIndex][activeUnit.colIndex].color;

    if (rIndex - 1 >= 0 && cIndex - 1 >= 0) {
        if (board[rIndex - 1][cIndex - 1].unit !== null) {
            if (board[rIndex - 1][cIndex - 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
        }
    }

    if (rIndex - 1 >= 0) {
        if (board[rIndex - 1][cIndex].unit !== null) {
            if (board[rIndex - 1][cIndex].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex });
        }
    }

    if (rIndex - 1 >= 0 && cIndex + 1 <= 7) {
        if (board[rIndex - 1][cIndex + 1].unit !== null) {
            if (board[rIndex - 1][cIndex + 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
        }
    }

    if (cIndex + 1 <= 7) {
        if (board[rIndex][cIndex + 1].unit !== null) {
            if (board[rIndex][cIndex + 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex, colIndex: cIndex + 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex, colIndex: cIndex + 1 });
        }
    }

    if (rIndex + 1 <= 7 && cIndex + 1 <= 7) {
        if (board[rIndex + 1][cIndex + 1].unit !== null) {
            if (board[rIndex + 1][cIndex + 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
        }
    }

    if (rIndex + 1 <= 7) {
        if (board[rIndex + 1][cIndex].unit !== null) {
            if (board[rIndex + 1][cIndex].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex });
        }
    }

    if (rIndex + 1 <= 7 && cIndex - 1 >= 0) {
        if (board[rIndex + 1][cIndex - 1].unit !== null) {
            if (board[rIndex + 1][cIndex - 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
        }
    }

    if (cIndex - 1 >= 0) {
        if (board[rIndex][cIndex - 1].unit !== null) {
            if (board[rIndex][cIndex - 1].color !== color) {
                possiblePwnTiles.push({ rowIndex: rIndex, colIndex: cIndex - 1 });
            }
        } else {
            possibleMoveTiles.push({ rowIndex: rIndex, colIndex: cIndex - 1 });
        }
    }

    if (board[rIndex][cIndex].color === 'white') {
        if ((board[rIndex][cIndex]?.isMoved === false) && board[7][7].unit === 'R' && board[7][7].isMoved === false && board[7][6].unit === null && board[7][5].unit === null) {
            possibleMoveTiles.push({ rowIndex: 7, colIndex: 7 });
        }
        if ((board[rIndex][cIndex]?.isMoved === false) && board[7][0].unit === 'R' && board[7][0].isMoved === false && board[7][1].unit === null && board[7][2].unit === null && board[7][3].unit === null) {
            possibleMoveTiles.push({ rowIndex: 7, colIndex: 0 });
        }
    }

    if (board[rIndex][cIndex].color === 'black') {
        if ((board[rIndex][cIndex]?.isMoved === false) && board[0][7].unit === 'R' && board[0][7].isMoved === false && board[0][6].unit === null && board[0][5].unit === null) {
            possibleMoveTiles.push({ rowIndex: 0, colIndex: 7 });
        }
        if ((board[rIndex][cIndex]?.isMoved === false) && board[0][0].unit === 'R' && board[0][0].isMoved === false && board[0][1].unit === null && board[0][2].unit === null && board[0][3].unit === null) {
            possibleMoveTiles.push({ rowIndex: 0, colIndex: 0 });
        }
    }

    return {
        possibleMoveTiles: possibleMoveTiles,
        possiblePwnTiles: possiblePwnTiles
    }
}