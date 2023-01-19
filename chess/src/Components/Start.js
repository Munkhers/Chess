import React from 'react'
import { useNavigate } from 'react-router-dom'
import background from '../pieces/chessbackground.jpg'
import {Button} from 'antd'

const StartPage = () => {
    const navigate = useNavigate()
    return (
        <div className='start-container'>
            <img className='start-background' src={background} alt=''/>
            <Button className='start-button' onClick={() => navigate('/chessgame')}>New Game</Button>
        </div>
    )
}
export default StartPage