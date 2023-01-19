import React, { useEffect, useState } from 'react'
import './chess.css'
import Tile from './Tile'
import PwndTile from "./Pwned"
import { getPawnPossibleMoves } from './pawn'
import { getRookPossibleMoves } from './rook'
import { getKnightPossibleMoves } from './knight'
import { getQueenPossibleMoves } from './queen'
import { getKingPossibleMoves } from './king'
import { getBishopPossibleMoves } from './bishop'
import { Button } from 'antd'
// import { initialBoard } from './initialBoard'



const Chess = () => {

    const [turn, setTurn] = useState(localStorage.getItem('turn') ? JSON.parse(localStorage.getItem('turn')) : 'white');
    const [activeUnit, setActiveUnit] = useState({ rowIndex: null, colIndex: null, unit: null });
    const [pwndList, setPwndList] = useState(localStorage.getItem('pwnd') ? JSON.parse(localStorage.getItem('pwnd')) : {
        'white': [],
        'black': [],
    });
    useEffect(() => {
        localStorage.setItem('turn', JSON.stringify(turn))
    }, [turn])

    useEffect(() => {
        localStorage.setItem('pwnd', JSON.stringify(pwndList))
    }, [pwndList])


    const [board, setBoard] = useState(
        localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board')) : [
            [
                { unit: 'R', color: 'black', class: 'canClick', isMoved: false },
                { unit: 'N', color: 'black', class: 'canClick' },
                { unit: 'B', color: 'black', class: 'canClick' },
                { unit: 'Q', color: 'black', class: 'canClick' },
                { unit: 'K', color: 'black', class: 'canClick', isMoved: false },
                { unit: 'B', color: 'black', class: 'canClick' },
                { unit: 'N', color: 'black', class: 'canClick' },
                { unit: 'R', color: 'black', class: 'canClick', isMoved: false },
            ],
            [
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
            ],
            [
                { unit: 'R', color: 'white', class: 'canClick', isMoved: false },
                { unit: 'N', color: 'white', class: 'canClick' },
                { unit: 'B', color: 'white', class: 'canClick' },
                { unit: 'K', color: 'white', class: 'canClick' },
                { unit: 'Q', color: 'white', class: 'canClick', isMoved: false },
                { unit: 'B', color: 'white', class: 'canClick' },
                { unit: 'N', color: 'white', class: 'canClick' },
                { unit: 'R', color: 'white', class: 'canClick', isMoved: false },
            ],
        ]);

    useEffect(() => {
        localStorage.setItem(
            'board',
            JSON.stringify(board),
        )
    }, [board])


    const onMove = (toRowIndex, toColIndex) => {
        setBoard(currState => {
            let isMoved = false;
            if (activeUnit.unit === 'R' || activeUnit.unit === 'K') {
                isMoved = true
            }
            currState[toRowIndex][toColIndex] = { unit: activeUnit.unit, color: turn, class: 'canClick', isMoved: isMoved }
            currState[activeUnit.rowIndex][activeUnit.colIndex] = { unit: null, class: 'canClick' };
            setActiveUnit({ rowIndex: null, colIndex: null, unit: null })
            setTurn(currState => currState === 'white' ? 'black' : 'white')
            return currState
        })
    }
    const onCastling = (toRowIndex, toColIndex) => {
        setBoard(currState => {
            if (currState[activeUnit.rowIndex][activeUnit.colIndex].color === 'white') {
                if (toColIndex === 7) {
                    currState[7][5] = { unit: 'R', color: 'white', isMoved: true, class: 'cantClick' };
                    currState[7][6] = { unit: 'K', color: 'white', isMoved: true, class: 'cantClick' };
                    currState[7][4] = { unit: null, class: 'cantClick' };
                    currState[7][7] = { unit: null, class: 'cantClick' };
                } else {
                    currState[7][3] = { unit: 'R', color: 'white', isMoved: true, class: 'cantClick' };
                    currState[7][2] = { unit: 'K', color: 'white', isMoved: true, class: 'cantClick' };
                    currState[7][4] = { unit: null, class: 'cantClick' };
                    currState[7][0] = { unit: null, class: 'cantClick' };
                }
            } else {
                if (toColIndex === 7) {
                    currState[0][5] = { unit: 'R', color: 'black', isMoved: true, class: 'cantClick' }
                    currState[0][6] = { unit: 'K', color: 'black', isMoved: true, class: 'cantClick' }
                    currState[0][4] = { unit: null, class: 'cantClick' }
                    currState[0][7] = { unit: null, class: 'cantClick' }
                } else {
                    currState[0][3] = { unit: 'R', color: 'black', isMoved: true, class: 'cantClick' }
                    currState[0][2] = { unit: 'K', color: 'black', isMoved: true, class: 'cantClick' }
                    currState[0][4] = { unit: null, class: 'cantClick' }
                    currState[0][0] = { unit: null, class: 'cantClick' }
                }
            }

            setActiveUnit({ rowIndex: null, colIndex: null, unit: null });
            setTurn(currState => currState === 'white' ? 'black' : 'white')

            return currState
        })
    }

    const onUnitClick = (rowIndex, colIndex, unit) => {
        if (board[rowIndex][colIndex].unit === null) {
            onMove(rowIndex, colIndex);
        } else {
            if (activeUnit.unit && board[activeUnit.rowIndex][activeUnit.colIndex].color === turn && board[rowIndex][colIndex] !== null && board[7][1] === null && board[7][2] === null) {
                if (board[activeUnit.rowIndex][activeUnit.colIndex].unit === 'K' && board[rowIndex][colIndex].unit === 'R') {
                    onCastling(rowIndex, colIndex);
                } else {
                    clearBoard(rowIndex, colIndex);
                }

            } else {
                setActiveUnit({ unit: board[rowIndex][colIndex].unit, rowIndex: rowIndex, colIndex: colIndex })
            }
        }
    }
    const clearBoard = (rowIndex, colIndex) => {
        setBoard((currState) => {
            currState.forEach((rows, rIndex) => {
                rows.forEach((item, cIndex) => {
                    if (item.class === 'canMove') {
                        currState[rIndex][cIndex].class = 'cantClick'
                    }
                })
            })
            return currState
        })

        setActiveUnit({ unit: board[rowIndex][colIndex].unit, rowIndex: rowIndex, colIndex: colIndex })
    }

    const onPwn = (rowIndex, colIndex, unit) => {
        let pwnd = { unit: board[rowIndex][colIndex].unit, color: board[rowIndex][colIndex].color }
        setPwndList((currState) => {
            if (pwnd.color === 'white') {
                return { ...currState, black: [...currState.black, pwnd.unit] }
            } else {
                return { ...currState, white: [...currState.white, pwnd.unit] }
            }
        });
        setBoard(currState => {
            currState[rowIndex][colIndex] = { unit: activeUnit.unit, color: turn, class: 'cantClick' }
            currState[activeUnit.rowIndex][activeUnit.colIndex] = { unit: null, class: 'cantClick' }
            setActiveUnit({ rowIndex: null, colIndex: null, unit: null });
            setTurn(currState => {
                return currState === 'white' ? 'black' : 'white'
            })
            return currState
        })
    }
    useEffect(() => {
        setBoard((currState) => {
            let newItems = [...currState];
            newItems.forEach((arr, rowIndex) => {
                arr.forEach((item, colIndex) => {
                    if (turn !== item?.color) {
                        newItems[rowIndex][colIndex].class = 'cantClick';
                    } else {
                        if (turn === item?.color) {
                            newItems[rowIndex][colIndex].class = 'canClick';
                        }
                    }
                })
            })
            return newItems;
        })
    }, [turn]);
    useEffect(() => {
        isInCheckMate()
        // eslint-disable-next-line
    }, [turn])

    // function getKingPossibleMoves(board, activeUnit) {
    //     let possibleMoveTiles = [];
    //     let possiblePwnTiles = [];

    //     let rIndex = activeUnit.rowIndex;
    //     let cIndex = activeUnit.colIndex;

    //     let color = board[activeUnit.rowIndex][activeUnit.colIndex].color;

    //     if (rIndex - 1 >= 0 && cIndex - 1 >= 0) {
    //         if (board[rIndex - 1][cIndex - 1].unit !== null) {
    //             if (board[rIndex - 1][cIndex - 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
    //         }
    //     }

    //     if (rIndex - 1 >= 0) {
    //         if (board[rIndex - 1][cIndex].unit !== null) {
    //             if (board[rIndex - 1][cIndex].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex });
    //         }
    //     }

    //     if (rIndex - 1 >= 0 && cIndex + 1 <= 7) {
    //         if (board[rIndex - 1][cIndex + 1].unit !== null) {
    //             if (board[rIndex - 1][cIndex + 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
    //         }
    //     }

    //     if (cIndex + 1 <= 7) {
    //         if (board[rIndex][cIndex + 1].unit !== null) {
    //             if (board[rIndex][cIndex + 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex, colIndex: cIndex + 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex, colIndex: cIndex + 1 });
    //         }
    //     }

    //     if (rIndex + 1 <= 7 && cIndex + 1 <= 7) {
    //         if (board[rIndex + 1][cIndex + 1].unit !== null) {
    //             if (board[rIndex + 1][cIndex + 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
    //         }
    //     }

    //     if (rIndex + 1 <= 7) {
    //         if (board[rIndex + 1][cIndex].unit !== null) {
    //             if (board[rIndex + 1][cIndex].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex });
    //         }
    //     }

    //     if (rIndex + 1 <= 7 && cIndex - 1 >= 0) {
    //         if (board[rIndex + 1][cIndex - 1].unit !== null) {
    //             if (board[rIndex + 1][cIndex - 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex - 1 });
    //         }
    //     }

    //     if (cIndex - 1 >= 0) {
    //         if (board[rIndex][cIndex - 1].unit !== null) {
    //             if (board[rIndex][cIndex - 1].color !== color) {
    //                 possiblePwnTiles.push({ rowIndex: rIndex, colIndex: cIndex - 1 });
    //             }
    //         } else {
    //             possibleMoveTiles.push({ rowIndex: rIndex, colIndex: cIndex - 1 });
    //         }
    //     }

    //     if (board[rIndex][cIndex].color === 'white') {
    //         if ((board[rIndex][cIndex]?.isMoved === false) && board[7][7].unit === 'R' && board[7][7].isMoved === false && board[7][6].unit === null && board[7][5].unit === null) {
    //             possibleMoveTiles.push({ rowIndex: 7, colIndex: 7 });
    //         }
    //         if ((board[rIndex][cIndex]?.isMoved === false) && board[7][0].unit === 'R' && board[7][0].isMoved === false && board[7][1].unit === null && board[7][2].unit === null && board[7][3].unit === null) {
    //             possibleMoveTiles.push({ rowIndex: 7, colIndex: 0 });
    //         }
    //     }

    //     if (board[rIndex][cIndex].color === 'black') {
    //         if ((board[rIndex][cIndex]?.isMoved === false) && board[0][7].unit === 'R' && board[0][7].isMoved === false && board[0][6].unit === null && board[0][5].unit === null) {
    //             possibleMoveTiles.push({ rowIndex: 0, colIndex: 7 });
    //         }
    //         if ((board[rIndex][cIndex]?.isMoved === false) && board[0][0].unit === 'R' && board[0][0].isMoved === false && board[0][1].unit === null && board[0][2].unit === null && board[0][3].unit === null) {
    //             possibleMoveTiles.push({ rowIndex: 0, colIndex: 0 });
    //         }
    //     }
    //     console.log(possibleMoveTiles)
    //     return {
    //         possibleMoveTiles: possibleMoveTiles,
    //         possiblePwnTiles: possiblePwnTiles
    //     }
    // }
    const onNewGame = () => {
        setBoard([
            [
                { unit: 'R', color: 'black', class: 'canClick', isMoved: false },
                { unit: 'N', color: 'black', class: 'canClick' },
                { unit: 'B', color: 'black', class: 'canClick' },
                { unit: 'Q', color: 'black', class: 'canClick' },
                { unit: 'K', color: 'black', class: 'canClick', isMoved: false },
                { unit: 'B', color: 'black', class: 'canClick' },
                { unit: 'N', color: 'black', class: 'canClick' },
                { unit: 'R', color: 'black', class: 'canClick', isMoved: false },
            ],
            [
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
                { unit: 'P', color: 'black', class: 'canClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
                { unit: null, class: 'cantClick' },
            ],
            [
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
                { unit: 'P', color: 'white', class: 'canClick' },
            ],
            [
                { unit: 'R', color: 'white', class: 'canClick', isMoved: false },
                { unit: 'N', color: 'white', class: 'canClick' },
                { unit: 'B', color: 'white', class: 'canClick' },
                { unit: 'K', color: 'white', class: 'canClick' },
                { unit: 'Q', color: 'white', class: 'canClick', isMoved: false },
                { unit: 'B', color: 'white', class: 'canClick' },
                { unit: 'N', color: 'white', class: 'canClick' },
                { unit: 'R', color: 'white', class: 'canClick', isMoved: false },
            ],
        ])
        setTurn('white')
        setPwndList({ 'white': [], 'black': []})
    }
    const getPossibleMoves = (rowIndex, colIndex, unit) => {
        let result = {
            possibleMoveTiles: [],
            possiblePwnTiles: []
        };
        switch (unit) {
            case 'P':
                result = getPawnPossibleMoves(board, activeUnit);
                break;
            case 'R':
                result = getRookPossibleMoves(board, activeUnit);
                break;
            case 'N':
                result = getKnightPossibleMoves(board, activeUnit)
                break;
            case 'B':
                result = getBishopPossibleMoves(board, activeUnit);
                break;
            case 'Q':
                result = getQueenPossibleMoves(board, activeUnit);
                break;
            case 'K':
                result = getKingPossibleMoves(board, activeUnit);
                break;
            default:
                break;
        }

        setBoard((old) => {
            let currState = [...old];
            result.possibleMoveTiles.forEach((coordinate, index) => {
                currState[coordinate.rowIndex][coordinate.colIndex].class = 'canMove';
            })
            return currState;
        })

        setBoard((old) => {
            let currState = [...old];
            result.possiblePwnTiles.forEach((coordinate, index) => {
                currState[coordinate.rowIndex][coordinate.colIndex].class = 'canPwn';
            })
            return currState;
        })
    }
    useEffect(() => {
        if (activeUnit.unit !== null) {
            getPossibleMoves(activeUnit.rowIndex, activeUnit.colIndex, activeUnit.unit);
        }
        // eslint-disable-next-line
    }, [activeUnit])

    const isInCheckMate = () => {
        let possiblePwnTiles = [];
        if (turn === 'black') {
            board.forEach((arr, rowIndex) => {
                arr.forEach((item, colIndex) => {
                    if (item.unit !== null && item.color === 'white' && item.unit === 'P') {
                        let rIndex = rowIndex;
                        let cIndex = colIndex;
                        if ((rIndex - 1 >= 0 && cIndex + 1 <= 7) &&
                            (board[rIndex - 1][cIndex + 1].unit !== null &&
                                board[rIndex - 1][cIndex + 1].color === 'black') &&
                            board[rIndex - 1][cIndex + 1].unit === 'K') {
                            possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex + 1 });
                        }
                        if ((rIndex - 1 >= 0 && cIndex - 1 >= 0) &&
                            (board[rIndex - 1][cIndex - 1].unit !== null &&
                                board[rIndex - 1][cIndex - 1].color === 'black') &&
                            board[rIndex - 1][cIndex - 1].unit === 'K') {
                            possiblePwnTiles.push({ rowIndex: rIndex - 1, colIndex: cIndex - 1 });
                        }
                        if ((rIndex + 1 <= 7 && cIndex + 1 <= 7) &&
                            (board[rIndex + 1][cIndex + 1].unit !== null &&
                                board[rIndex + 1][cIndex + 1].color === 'white') &&
                            board[rIndex + 1][cIndex + 1].unit === 'K') {
                            possiblePwnTiles.push({ rowIndex: rIndex + 1, colIndex: cIndex + 1 });
                        }
                        if ((rIndex + 1 <= 7 && cIndex - 1 >= 0) &&
                            (board[rIndex + 1][cIndex - 1].unit !== null &&
                                board[rIndex + 1][cIndex - 1].color === 'white') &&
                            board[rIndex + 1][cIndex - 1].unit === 'K') {
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

    const checkWinner = (extPossiblePwnTiles, color) => {
        let possibleMoveTiles = [];
        let possiblePwnTiles = [];
        if (color === 'white') {
            let kingPosition = { rowIndex: null, colIndex: null };
            board.forEach((arr, rowIndex) => {
                arr.forEach((item, colIndex) => {
                    if (item.unit !== null && item.unit === 'K' && item.color === 'white') {
                        kingPosition.rowIndex = rowIndex;
                        kingPosition.colIndex = colIndex;
                    }
                })
            })

            let rIndex = kingPosition.rowIndex;
            let cIndex = kingPosition.colIndex;
            let color = 'white';

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

            if (possibleMoveTiles.length === 0 && possiblePwnTiles.length === 0) {
                alert('Black won');
            }
        } else {
            let kingPosition = { rowIndex: null, colIndex: null };
            board.forEach((arr, rowIndex) => {
                arr.forEach((item, colIndex) => {
                    if (item.unit !== null && item.unit === 'K' && item.color === 'black') {
                        kingPosition.rowIndex = rowIndex;
                        kingPosition.colIndex = colIndex;
                    }
                })
            })

            let rIndex = kingPosition.rowIndex;
            let cIndex = kingPosition.colIndex;
            let color = 'black';

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

            if (possibleMoveTiles.length === 0 && possiblePwnTiles.length === 0) {
                alert('White won');
            }
        }
    }


    return (
        <>
            <Button className='new-game-btn' onClick={() => onNewGame()}>New Game</Button>
            <div style={{ visibility: turn === 'black' ? 'visible' : 'hidden' }}><h5>Black player turn</h5></div>
            <div>
                {
                    pwndList.black.map((item, index) => {
                        return <PwndTile key={index} unit={{ unit: item, color: 'white' }} />
                    })
                }
            </div>
            <div className='chess-container'>
                {
                    board.map((arr, rowIndex) => {
                        return arr.map((item, colIndex) => {
                            return (
                                <div className={(rowIndex + colIndex) % 2 === 0 ? 'tile black-tile' : 'tile white-tile'}
                                    key={rowIndex + colIndex}>
                                    <Tile
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        unit={item}
                                        onUnitClick={(rowIndex, colIndex, unit) => { onUnitClick(rowIndex, colIndex, unit) }}
                                        activeUnit={activeUnit}
                                        onPwn={(rowIndex, colIndex, unit) => { onPwn(rowIndex, colIndex, unit) }}
                                    />
                                </div>
                            )
                        })
                    })
                }
            </div>
            <div>
                {
                    pwndList.white.map((item, index) => {
                        return <PwndTile key={index} unit={{ unit: item, color: 'black' }} />
                    })
                }
            </div>
            <div style={{ width: "inherit", visibility: turn === 'white' ? 'visible' : 'hidden' }}><h5>White player turn</h5></div>
        </>
    )
}
export default Chess