import React from 'react';

//a simple stateless component that returns the rules of the Game

function Rules(props) {
    return(
        <div>
        <h1>Rules of the game:</h1>
            <ul>
                <li>The goal of the game is to find all the mines on the board.</li>
                <li>You reveal mines by clicking the cells, if you reveal a mine you loose.</li>
                <li>If you reveal a cell without mine it will show number of mines surrounding the cell.</li>
                
                <li>You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.</li>
            </ul>
    </div>
    )
  
}


export default Rules;