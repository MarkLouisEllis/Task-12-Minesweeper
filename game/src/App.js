import React, {Component} from 'react';
//import './App.css';
import Display from './Components/Display';
import MyMenu from './Components/Menu';
import { BrowserRouter,Route,Link} from "react-router-dom";
import Rules from './Components/Rules';
import './Components/tilecss.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state={
    height:12,
    width:12,
    mines: 20,
    value:""
  };

  //event handler to refresh the page when the restart button is clicked
  refreshPage = () =>{
    window.location.reload(false);
  }
 //event handler to execute function to change difficulty. On change event will update teh state of "value" to the target value ie "easy" when selected.
 //I will then change the state of the width,height and mines accordingly to be able to render a smaller or bigger grid. (this funcionality is not yet working as it should).
 //I have tested and established that the state does change but I cannot seem to have it change the size of the board. This functionality is a work in progress as its not specifically outlined for this task.
  selectDifficulty = (event)=>{
    this.setState({value: event.target.value} );
    
    if(this.state.value == 'easy'){
      this.setState({height: 4})
      this.setState({width: 4})
      
    }if(this.state.value == 'medium'){
      
    }
  }


// The render function of this file holds my menu, grid and rules components. I have used the react router to show only the components that I want according to the menu

  render(){
    const { mines } = this.state;
  return (
    

    <BrowserRouter>
    <div className="boardbody">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossorigin="anonymous"
    />
      <MyMenu/>
      
      <Route path="/minesweeper" render={() =>(
        <div>
          <label>Please select a difficulty:</label>
            <select value = {this.state.value} onChange={this.selectDifficulty}>
              <option value ="easy">Easy</option>
              <option value ="medium">Medium</option>
              <option value ="hard">Hard</option>
            </select>
        </div>
      )}/>
      
      <Route path="/minesweeper" render={() =>(<Display height={this.state.height} width={this.state.width} mines={mines} />)}/>
      
      
      <Route exact={true} path="/rules" component={Rules} />
    
    </div>
    </BrowserRouter>
    
  );
}
}

export default App;


//I used this resource as a guide and template for my app. I have included some other functionality and removed some from the original. I used this as I did not
//fully grasp any other logic as to how to get the application to have the basic functionality of the minesweeper game. I have not implemented the functionality to 
//flag any of the tiles.

//Resource : "https://codeburst.io/learning-react-js-by-building-a-minesweeper-game-ced9d41560ed" accessed 2021/04/28
