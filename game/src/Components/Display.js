//I will create the display of the minesweeper game by generating a set number of tiles. These tiles will be given values that are testes in the tile component.
//

import React, {Component} from 'react';
import Tiles from "./Tiles";
import Rulesbtn from'./Rulesbtn';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridvalues:this.initgridvalues(this.props.height, this.props.width, this.props.mines),
            mineCount: this.props.mines,
        };
    }

  
  // Gets initial board values from the props set in app.js
  initgridvalues(height, width, mines) {
    let values = this.createEmptyArray(height, width);
    values = this.plantMines(values, height, width, mines);
    values = this.getNeighbours(values, height, width);
    return values;
  }


    //Create an empty array that will take the height and width state of the app.js and create an array if that size. In this array we also set all properties
    //to 0 or false. 
    createEmptyArray(height, width) {
        let values = [];
    
        for (let i = 0; i < height; i++) {
          values.push([]);
          for (let j = 0; j < width; j++) {
            values[i][j] = {
              x: i,
              y: j,
              isMine: false,
              neighbour: 0,
              isRevealed: false,
              isEmpty: false,
              
            };
          }
        }
        return values;
      }

  // get random number given a dimension that will be used to randomly plant mines
  getRandomNumber(dimension) {
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }
  
  // plant mines on the board using the getrandomnumber function. The will place mines untli 15 mines have been planted. This function checks
  //if if the values in a tile is isMine:false with an if statement. If the value is false it will 
  plantMines(values, height, width, mines) {
    let randomx, randomy, minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = this.getRandomNumber(width);
      randomy = this.getRandomNumber(height);
      if (!(values[randomx][randomy].isMine)) {
        values[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }

    return (values);
  }

  // get number of neighbouring mines for each board cell
  getNeighbours(values, height, width) {
    let updatedvalues = values, index = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (values[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(values[i][j].x, values[i][j].y, values);
          area.map(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedvalues[i][j].isEmpty = true;
          }
          updatedvalues[i][j].neighbour = mine;
        }
      }
    }

    return (updatedvalues);
  };

  // looks for neighbouring cells and returns them
  traverseBoard(x, y, values) {
    const el = [];

    //up
    if (x > 0) {
      el.push(values[x - 1][y]);
    }

    //down
    if (x < this.props.height - 1) {
      el.push(values[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(values[x][y - 1]);
    }

    //right
    if (y < this.props.width - 1) {
      el.push(values[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(values[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < this.props.width - 1) {
      el.push(values[x - 1][y + 1]);
    }

    // bottom right
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      el.push(values[x + 1][y + 1]);
    }

    // bottom left
    if (x < this.props.height - 1 && y > 0) {
      el.push(values[x + 1][y - 1]);
    }

    return el;
  }

  // reveals the whole board
  revealBoard() {
    let updatedvalues = this.state.gridvalues;
    updatedvalues.map((valuesrow) => {
      valuesrow.map((valuesitem) => {
        valuesitem.isRevealed = true;
      });
    });
    this.setState({
      gridvalues: updatedvalues
    })
  }

  /* reveal logic for empty cell */
  revealEmpty(x, y, values) {
    let area = this.traverseBoard(x, y, values);
    area.map(value => {
      if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
        values[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, values);
        }
      }
    });
    return values;

  }
  //get Hidden cells to be able to alert the user when they have won. 
  getHidden(values) {
    let mineArray = [];

    values.map(valuesrow => {
      valuesrow.map((valuesitem) => {
        if (!valuesitem.isRevealed) {
          mineArray.push(valuesitem);
        }
      });
    });

    return mineArray;
  }


      //handleclick event

      handleCellClick(x, y) {

        // check if revealed. return if true.
        if (this.state.gridvalues[x][y].isRevealed ) return null;
    
        // check if mine. game over if true and call revealboard.
        if (this.state.gridvalues[x][y].isMine) {
          this.setState({ gameStatus: "You Lost." });
          this.revealBoard();
          
        }
    
        let updatedvalues = this.state.gridvalues;
        updatedvalues[x][y].isRevealed = true;
    
        if (updatedvalues[x][y].isEmpty) {
          updatedvalues = this.revealEmpty(x, y, updatedvalues);
        }
    
        if (this.getHidden(updatedvalues).length === this.props.mines) {
          this.setState({ mineCount: 0, gameStatus: "You Win." });
          this.revealBoard();
          
        }
    
        this.setState({
          gridvalues: updatedvalues,
          mineCount: this.props.mines
        });
      }

      

      //event handler to refresh the page when the restart button is clicked
      refreshPage = () =>{
        window.location.reload(false);
      }

      //handler to render the board using the map function. The Map function craetes the x y grid and calls the tile Component which populates the value within the tile.
      renderBoard(values) {
        return values.map((valuesrow) => {
          return valuesrow.map((valuesitem) => {
            return (
              <div key={valuesitem.x * valuesrow.length + valuesitem.y}>
                <Tiles 
                  onClick={() => this.handleCellClick(valuesitem.x, valuesitem.y)}
                  value={valuesitem}/>
              </div>);
          })
        });
      }

      
    render() {
        
        return (
           <div>
            <div className="board">
                  <div className="game-info">
                  
                  <h1 className="info">{this.state.gameStatus}</h1>
                  </div>
                      {this.renderBoard(this.state.gridvalues)}
                                
              </div>
                <button id="restartbtn" onClick={this.refreshPage}>Restart</button> 
                <Rulesbtn/>  
            </div>
        );
    }
}


export default Display;