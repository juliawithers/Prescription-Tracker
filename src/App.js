import React, { Component } from 'react';
// import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import context from './context';
// import config from './config';
import STORE from './STORE';
import Login from './Login/Login';  
import List from './List/List';
import Hamburger from './pictures/hamburger.png';
import xOut from './pictures/x_out.png';

export default class App extends Component {
  
  //need to set up this state based off of STORE.js
  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      prescriptions: [],
      handleLoginSubmit: () => {},
      menu: '',
      click: false
    }
  }

  handleLoginSubmit = (username, password)=>{
    // const object = {
    //   username: username,
    //   password: password
    // };
    for (let i=0; STORE.users.length; i++) {
      if (username === STORE.users[i].username && password === STORE.users[i].password) {
        
        this.setState({
          user_id: STORE.users[i].user_id,
          prescriptions: STORE.prescriptions[i].prescripts
        });
      }
    }
  }

  // componentDidMount() {
    
  // }

  createLanding=()=>{
    if (this.state.user_id === ''){
      return (
        <Login />
      )
    }
  }

  createMainRoutes=()=>{
    if (this.state.user_id !== ''){
      return (
        <List />
      )
    }
  }

  menuClick=()=>{
    this.setState({
      menu: 'hide',
      icon: Hamburger
    })
  }
 
  hamburgerClick = () => {
    if (this.state.click === true) {
      return (
        <span className="ham">
          <img id="hamburger" src={this.state.icon} onClick={this.handleHamClick} alt="Hamburger Menu for Smaller Screensize" />
        </span>
      )
    } else {
      return <div></div>
    }
  }

  handleHamClick = () => {
    if (this.state.menu === 'hide') {
      this.setState({
        menu: 'show',
        icon: xOut
      })
    } else if (this.state.menu === 'show') {
      this.setState({
        menu: 'hide',
        icon: Hamburger
      })
    }
  }

  handleClick = () => {
    this.setState({
      click: true
    })
  }

  createNavRoutes=()=>{
    return(
      <div className="navigation">
        <button>Logout</button>
      </div>
    )
  }
  
  render(){

    const contextValue = {
      user_id: this.state.user_id,
      prescriptions: this.state.prescriptions,
      handleLoginSubmit: this.handleLoginSubmit
    };

    let menu = this.state.menu === 'hide'
      ? <div></div>
      : <div className="menu">
        {this.createNavRoutes()}
      </div>
    let bigMenu = this.state.click === true 
      ? <div className="big-screen">
          {this.createNavRoutes()}
        </div>
      : <div></div>

    return (
      <context.Provider value={contextValue}>
        <div className="app">
          <header><h1>Stock'Em!</h1></header>
          <nav role="navigation">
            <div className="small-screen">
              {this.hamburgerClick()}
              {menu}  
            </div>
            {bigMenu}
          </nav>
          <main>
            {this.createLanding()}
            {this.createMainRoutes()}
          </main>
        </div>
      </context.Provider>
    )
  }
}

// export default withRouter(App)