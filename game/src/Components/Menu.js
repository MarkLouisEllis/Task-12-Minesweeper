import React from 'react';

import {Link} from "react-router-dom";

import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    
  } from "@reach/menu-button";
  import "@reach/menu-button/styles.css";

  //This menu Component is created with the @ reach menu-item package. Each menu item is within a link that would update the url to the specified 
  //string. This works with the browser router that is used in App.js

function MyMenu(props){
    return(
        <div>
           
        <Menu >
          <MenuButton id='mymenu'>
            Menu <span aria-hidden>▾</span>
          </MenuButton>
            
            <MenuList>
                <MenuItem ><Link to="/Rules">Rules</Link></MenuItem>
                <MenuItem ><Link to="/Minesweeper">Minesweeper</Link></MenuItem>
            </MenuList>
        </Menu>
    
        </div>
    )
}


export default MyMenu;