export function isInCheckMate(){
    let possiblePwnTiles = [];
    if (turn === 'black') {
        board.forEach((arr, rowIndex) => {
            arr.forEach((item, colIndex) => {
                if (item.unit !== null && item.color === 'white' && item.unit === 'P') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    if ((rIndex - 1 >= 0 && cIndex + 1 <= 7) && (board[rIndex - 1][cIndex + 1].unit !== null && board[rIndex - 1][cIndex + 1].color === 'black') && board[rIndex - 1][cIndex + 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
                    }
                    if ((rIndex - 1 >= 0 && cIndex - 1 >= 0) && (board[rIndex - 1][cIndex - 1].unit !== null && board[rIndex - 1][cIndex - 1].color === 'black') && board[rIndex - 1][cIndex - 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
                    }
                    if ((rIndex + 1 <= 7 && cIndex + 1 <= 7) && (board[rIndex + 1][cIndex + 1].unit !== null && board[rIndex + 1][cIndex + 1].color === 'white') && board[rIndex + 1][cIndex + 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
                    }
                    if ((rIndex + 1 <= 7 && cIndex - 1 >= 0) && (board[rIndex + 1][cIndex - 1].unit !== null && board[rIndex + 1][cIndex - 1].color === 'white') && board[rIndex + 1][cIndex - 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
                    }
                }
                if (item.unit !== null && item.color === 'white' && item.unit === 'R') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;

                    for (let rowIndex = rIndex; rowIndex >= 0; rowIndex--) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== 'white' && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex; rowIndex <= 7; rowIndex++) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== 'white' && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex >= 0; colIndex--) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== 'white' && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex <= 7; colIndex++) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== 'white' && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'white' && item.unit === 'N') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'white';
                    if (rIndex > 1) {
                        if (cIndex > 0) {
                            if (board[rIndex - 2][cIndex - 1].unit !== null) {
                                if (board[rIndex - 2][cIndex - 1].color !== color && board[rIndex - 2][cIndex - 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex - 1 });
                                }
                            }
                        }
                        if (cIndex < 7) {
                            if (board[rIndex - 2][cIndex + 1].unit !== null) {
                                if (board[rIndex - 2][cIndex + 1].color !== color && board[rIndex - 2][cIndex + 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex + 1 });
                                }
                            }
                        }
                    }
                    if (rIndex < 6) {
                        if (cIndex > 0) {
                            if (board[rIndex + 2][cIndex - 1].unit !== null) {
                                if (board[rIndex + 2][cIndex - 1].color !== color && board[rIndex + 2][cIndex - 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex - 1 });
                                }
                            }
                        }
                        if (cIndex < 7) {
                            if (board[rIndex + 2][cIndex + 1].unit !== null) {
                                if (board[rIndex + 2][cIndex + 1].color !== color && board[rIndex + 2][cIndex + 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex + 1 });
                                }
                            }
                        }
                    }
                    if (cIndex > 1) {
                        if (rIndex > 0) {
                            if (board[rIndex - 1][cIndex - 2].unit !== null) {
                                if (board[rIndex - 1][cIndex - 2].color !== color && board[rIndex - 1][cIndex - 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 2 });
                                }
                            }
                        }
                        if (rIndex < 7) {
                            if (board[rIndex + 1][cIndex - 2].unit !== null) {
                                if (board[rIndex + 1][cIndex - 2].color !== color && board[rIndex + 1][cIndex - 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 2 });
                                }
                            }
                        }
                    }
                    if (cIndex < 6) {
                        if (rIndex > 0) {
                            if (board[rIndex - 1][cIndex + 2].unit !== null) {
                                if (board[rIndex - 1][cIndex + 2].color !== color && board[rIndex - 1][cIndex + 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 2 });
                                }
                            }
                        }
                        if (rIndex < 7) {
                            if (board[rIndex + 1][cIndex + 2].unit !== null) {
                                if (board[rIndex + 1][cIndex + 2].color !== color && board[rIndex + 1][cIndex + 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 2 });
                                }
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'white' && item.unit === 'B') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'white';

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex <= 7; rowIndex++, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex >= 0; rowIndex++, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex <= 7; rowIndex--, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'white' && item.unit === 'Q') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'white';

                    for (let rowIndex = rIndex; rowIndex >= 0; rowIndex--) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== color && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex; rowIndex <= 7; rowIndex++) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== color && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex >= 0; colIndex--) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== color && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex <= 7; colIndex++) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== color && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex <= 7; rowIndex++, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex >= 0; rowIndex++, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex <= 7; rowIndex--, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
            })
        })

        let kingPosition = { rowIndex: null, colIndex: null };
        board.forEach((arr, rowIndex) => {
            arr.forEach((item, colIndex) => {
                if (item.unit !== null && item.unit === 'K' && item.color === 'black') {
                    kingPosition.rowIndex = rowIndex;
                    kingPosition.colIndex = colIndex;
                }
            })
        })

        possiblePwnTiles.forEach((item, index) => {
            if (item.rowIndex === kingPosition.rowIndex && item.colIndex === kingPosition.colIndex) {
                alert('Black king is in check mate');
                checkWinner(possiblePwnTiles, 'black');
            }
        })
    } else {
        board.forEach((arr, rowIndex) => {
            arr.forEach((item, colIndex) => {
                if (item.unit !== null && item.color === 'black' && item.unit === 'P') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    if ((rIndex - 1 >= 0 && cIndex + 1 <= 7) && (board[rIndex - 1][cIndex + 1].unit !== null && board[rIndex - 1][cIndex + 1].color === 'white') && board[rIndex - 1][cIndex + 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
                    }
                    if ((rIndex - 1 >= 0 && cIndex - 1 >= 0) && (board[rIndex - 1][cIndex - 1].unit !== null && board[rIndex - 1][cIndex - 1].color === 'white') && board[rIndex - 1][cIndex - 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
                    }
                    if ((rIndex + 1 <= 7 && cIndex + 1 <= 7) && (board[rIndex + 1][cIndex + 1].unit !== null && board[rIndex + 1][cIndex + 1].color === 'black') && board[rIndex + 1][cIndex + 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
                    }
                    if ((rIndex + 1 <= 7 && cIndex - 1 >= 0) && (board[rIndex + 1][cIndex - 1].unit !== null && board[rIndex + 1][cIndex - 1].color === 'black') && board[rIndex + 1][cIndex - 1].unit === 'K') {
                        possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
                    }
                }
                if (item.unit !== null && item.color === 'black' && item.unit === 'R') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;

                    for (let rowIndex = rIndex; rowIndex >= 0; rowIndex--) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== 'black' && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex; rowIndex <= 7; rowIndex++) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== 'black' && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex >= 0; colIndex--) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== 'black' && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex <= 7; colIndex++) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== 'black' && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'black' && item.unit === 'N') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'black';
                    if (rIndex > 1) {
                        if (cIndex > 0) {
                            if (board[rIndex - 2][cIndex - 1].unit !== null) {
                                if (board[rIndex - 2][cIndex - 1].color !== color && board[rIndex - 2][cIndex - 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex - 1 });
                                }
                            }
                        }
                        if (cIndex < 7) {
                            if (board[rIndex - 2][cIndex + 1].unit !== null) {
                                if (board[rIndex - 2][cIndex + 1].color !== color && board[rIndex - 2][cIndex + 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 2, colIndex: cIndex + 1 });
                                }
                            }
                        }
                    }
                    if (rIndex < 6) {
                        if (cIndex > 0) {
                            if (board[rIndex + 2][cIndex - 1].unit !== null) {
                                if (board[rIndex + 2][cIndex - 1].color !== color && board[rIndex + 2][cIndex - 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex - 1 });
                                }
                            }
                        }
                        if (cIndex < 7) {
                            if (board[rIndex + 2][cIndex + 1].unit !== null) {
                                if (board[rIndex + 2][cIndex + 1].color !== color && board[rIndex + 2][cIndex + 1].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 2, colIndex: cIndex + 1 });
                                }
                            }
                        }
                    }
                    if (cIndex > 1) {
                        if (rIndex > 0) {
                            if (board[rIndex - 1][cIndex - 2].unit !== null) {
                                if (board[rIndex - 1][cIndex - 2].color !== color && board[rIndex - 1][cIndex - 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 2 });
                                }
                            }
                        }
                        if (rIndex < 7) {
                            if (board[rIndex + 1][cIndex - 2].unit !== null) {
                                if (board[rIndex + 1][cIndex - 2].color !== color && board[rIndex + 1][cIndex - 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 2 });
                                }
                            }
                        }
                    }
                    if (cIndex < 6) {
                        if (rIndex > 0) {
                            if (board[rIndex - 1][cIndex + 2].unit !== null) {
                                if (board[rIndex - 1][cIndex + 2].color !== color && board[rIndex - 1][cIndex + 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 2 });
                                }
                            }
                        }
                        if (rIndex < 7) {
                            if (board[rIndex + 1][cIndex + 2].unit !== null) {
                                if (board[rIndex + 1][cIndex + 2].color !== color && board[rIndex + 1][cIndex + 2].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 2 });
                                }
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'black' && item.unit === 'B') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'black';

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex <= 7; rowIndex++, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex >= 0; rowIndex++, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex <= 7; rowIndex--, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
                if (item.unit !== null && item.color === 'black' && item.unit === 'Q') {
                    let rIndex = rowIndex;
                    let cIndex = colIndex;
                    let color = 'black';

                    for (let rowIndex = rIndex; rowIndex >= 0; rowIndex--) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== color && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex; rowIndex <= 7; rowIndex++) {
                        if (rowIndex !== rIndex) {
                            if (board[rowIndex][cIndex].unit !== null) {
                                if (board[rowIndex][cIndex].color !== color && board[rowIndex][cIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: cIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex >= 0; colIndex--) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== color && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let colIndex = cIndex; colIndex <= 7; colIndex++) {
                        if (colIndex !== cIndex) {
                            if (board[rIndex][colIndex].unit !== null) {
                                if (board[rIndex][colIndex].color !== color && board[rIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex >= 0; rowIndex--, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex <= 7; rowIndex++, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex <= 7 && colIndex >= 0; rowIndex++, colIndex--) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }

                    for (let rowIndex = rIndex, colIndex = cIndex; rowIndex >= 0 && colIndex <= 7; rowIndex--, colIndex++) {
                        if (rowIndex !== rIndex && colIndex !== cIndex) {
                            if (board[rowIndex][colIndex].unit !== null) {
                                if (board[rowIndex][colIndex].color !== color && board[rowIndex][colIndex].unit === 'K') {
                                    possiblePwnTiles.push({ rowIndex: rowIndex, colIndex: colIndex });
                                }
                                break;
                            }
                        }
                    }
                }
            });
        });

        let kingPosition = { rowIndex: null, colIndex: null };
        board.forEach((arr, rowIndex) => {
            arr.forEach((item, colIndex) => {
                if (item.unit !== null && item.unit === 'K' && item.color === 'white') {
                    kingPosition.rowIndex = rowIndex;
                    kingPosition.colIndex = colIndex;
                }
            })
        })

        possiblePwnTiles.forEach((item, index) => {
            if (item.rowIndex === kingPosition.rowIndex && item.colIndex === kingPosition.colIndex) {
                alert('White king is in check mate');
                checkWinner(possiblePwnTiles, 'white');
            }
        })
    }
}