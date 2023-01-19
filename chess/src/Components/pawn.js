export function getPawnPossibleMoves(board, activeUnit){
    let possibleMoveTiles = [];
    let possiblePwnTiles = [];

    let rIndex = activeUnit.rowIndex;
    let cIndex = activeUnit.colIndex;
    if (board[rIndex][cIndex].color === 'white') {
        if ((rIndex - 1 >= 0) && board[rIndex - 1][cIndex].unit === null) {
            possibleMoveTiles = [...possibleMoveTiles, { rowIndex: rIndex - 1, colIndex: cIndex }]
        }
        if ((rIndex - 2 >= 0 && rIndex === 6) && board[rIndex - 2][cIndex].unit === null) {
            possibleMoveTiles = [...possibleMoveTiles, { rowIndex: rIndex - 2, colIndex: cIndex }]
        }
        if ((rIndex - 1 >= 0 && cIndex + 1 <= 7) && (board[rIndex - 1][cIndex + 1].unit !== null && board[rIndex - 1][cIndex + 1].color === 'black')) {
            possiblePwnTiles = [...possiblePwnTiles, { rowIndex: rIndex - 1, colIndex: cIndex + 1 }]
        }
        if ((rIndex - 1 >= 0 && cIndex - 1 >= 0) && (board[rIndex - 1][cIndex - 1].unit !== null && board[rIndex - 1][cIndex - 1].color === 'black')) {
            possiblePwnTiles = [...possiblePwnTiles, { rowIndex: rIndex - 1, colIndex: cIndex - 1 }]
        }
    } else {
        if ((rIndex + 1 <= 7) && board[rIndex + 1][cIndex].unit === null) {
            possibleMoveTiles = [...possibleMoveTiles, { rowIndex: rIndex + 1, colIndex: cIndex }]
        }
        if ((rIndex + 2 <= 7 && rIndex === 1) && board[rIndex + 2][cIndex].unit === null) {
            possibleMoveTiles = [...possibleMoveTiles, { rowIndex: rIndex + 2, colIndex: cIndex }]
        }
        if ((rIndex + 1 <= 7 && cIndex + 1 <= 7) && (board[rIndex + 1][cIndex + 1].unit !== null && board[rIndex + 1][cIndex + 1].color === 'white')) {
            possiblePwnTiles = [...possiblePwnTiles, { rowIndex: rIndex + 1, colIndex: cIndex + 1 }]
        }
        if ((rIndex + 1 <= 7 && cIndex - 1 >= 0) && (board[rIndex + 1][cIndex - 1].unit !== null && board[rIndex + 1][cIndex - 1].color === 'white')) {
            possiblePwnTiles = [...possiblePwnTiles, { rowIndex: rIndex + 1, colIndex: cIndex - 1 }]
        }
    }

    return {
        possibleMoveTiles: possibleMoveTiles,
        possiblePwnTiles: possiblePwnTiles,
    }
}

