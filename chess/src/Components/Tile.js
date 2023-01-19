import React, { useEffect, useState } from 'react'
import d_bishop from '../pieces/d-bishop.png'
import d_king from '../pieces/d-king.png'
import d_knight from '../pieces/d-knight.png'
import d_pawn from '../pieces/d-pawn.png'
import d_queen from '../pieces/d-queen.png'
import d_rook from '../pieces/d-rook.png'
import pawn from '../pieces/pawn.png'
import bishop from '../pieces/bishop.png'
import king from '../pieces/king.png'
import knight from '../pieces/knight.png'
import queen from '../pieces/queen.png'
import rook from '../pieces/rook.png'

const Tile = ({ rowIndex, colIndex, unit, onUnitClick, activeUnit, onPwn }) => {

    const [img, setImage] = useState(null);
    useEffect(() => {
        if (unit && unit.unit === 'P' && unit.color === 'black') {
            setImage(d_pawn);
        } else if (unit && unit.unit === 'P' && unit.color === 'white') {
            setImage(pawn);
        } else if (unit && unit.unit === 'R' && unit.color === 'black') {
            setImage(d_rook);
        } else if (unit && unit.unit === 'R' && unit.color === 'white') {
            setImage(rook);
        } else if (unit && unit.unit === 'N' && unit.color === 'black') {
            setImage(d_knight);
        } else if (unit && unit.unit === 'N' && unit.color === 'white') {
            setImage(knight);
        } else if (unit && unit.unit === 'B' && unit.color === 'black') {
            setImage(d_bishop);
        } else if (unit && unit.unit === 'B' && unit.color === 'white') {
            setImage(bishop);
        } else if (unit && unit.unit === 'Q' && unit.color === 'black') {
            setImage(d_queen);
        } else if (unit && unit.unit === 'Q' && unit.color === 'white') {
            setImage(queen);
        } else if (unit && unit.unit === 'K' && unit.color === 'black') {
            setImage(d_king);
        } else if (unit && unit.unit === 'K' && unit.color === 'white') {
            setImage(king);
        } else {
            setImage(null);
        }
    }, [unit]);

    return (
        <div onClick={() => {
            if (unit.class === 'canClick' || unit.class === 'canMove' || unit.class === 'canPwn') {
                if (unit.class === 'canPwn') {
                    onPwn(rowIndex, colIndex, unit);
                } else {
                    onUnitClick(rowIndex, colIndex, unit);
                }
            }
        }} className={`${unit.class} ${((rowIndex === activeUnit.rowIndex && colIndex === activeUnit.colIndex) ? ' activeUnit' : '')}`}>
            <img src={img} alt='' className='img' width={56} />
        </div>
    )
}
export default Tile


