import React, { useState } from 'react';

import { createStage } from '../gameHelpers'; 

//Styled components
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris';

//Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);


    const movePlayer = dir => {
        updatePlayerPos({x:dir, y: 0});
    }

    const startGame = () => {
        // Reset
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x:0, y:1, collided: false});
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37 || keyCode === 65) {
                movePlayer(-1);
            } else if (keyCode === 39 || keyCode === 68) {
                movePlayer(1);
            } else if (keyCode === 40 || keyCode === 83) {
                dropPlayer();
            }
        }
    }


    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over"/>
                ) : (
                <div>
                <Display text="Score"/>
                <Display text="Rows"/>
                <Display text="Level"/>
                </div>
                )}
                <StartButton callback={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;