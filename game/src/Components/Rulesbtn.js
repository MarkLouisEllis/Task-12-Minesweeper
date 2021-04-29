// this is a reactstrap component that I used to create a popover component that is used to display the rules of the game
//without restarting the game. The button can be clicked to display and hide the rules whilst in game
import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class Rulesbtn extends Component {
  constructor() {    
    super();    
    this.state = {      
      name: "React",      
      popoverOpen: false    
    };
    this.togglePopover = this.togglePopover.bind(this);

  }


togglePopover() {    
  this.setState({ popoverOpen: !this.state.popoverOpen })  
}

render() {
    const { popoverOpen } = this.state;

    return (
      <div>
        <Button id="mypopover" type="button">
          Rules
        </Button>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="mypopover"
          toggle={this.togglePopover}
        >
          <PopoverHeader>Rules of the Game</PopoverHeader>
          <PopoverBody>
          <ul>
                <li>The goal of the game is to find all the mines on the board.</li>
                <li>You reveal mines by clicking the cells, if you reveal a mine you loose.</li>
                <li>If you reveal a cell without mine it will show number of mines surrounding the cell.</li>
                
                <li>You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.</li>
            </ul>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default Rulesbtn;