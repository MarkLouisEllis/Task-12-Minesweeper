//this component is used to render my tiles that will be placed on the board. The tile is a simple div with props assigned to it.
//The value of the tile will be fetched by the getValue  function.
// The function tests to see what value was assigned to the tile div with the help of if functions and returns the appropriate value as set in the display.js component.

import React, { Component } from 'react';

import './tilecss.css'


class Tiles extends Component {
 
    getValue(){
    const {value}=this.props;

    if (!value.isRevealed) {
      return null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;

  }

    render() {
      
      const {value,onClick}=this.props;
      let className = "tile"+
      (value.isRevealed ? "" : " hidden");
      
        return (
            <div className={className} onClick={onClick} >{this.getValue()}</div>
        );
      }
      
    }
    

    export default Tiles;

