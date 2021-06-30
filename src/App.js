// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import context from './context';
// import config from './config';
import STORE from './STORE';
import Login from './Login/Login.js';
import List from './List/List.js';

export default class App extends Component{
  
  //need to set up this state based off of STORE.js
  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      prescriptions: []
    }
  }

  handleLoginSubmit = (username, password){
    const object = {
      username: username,
      password: password
    };
    for (i=0; STORE.users.length; i++) {
      if (username == STORE.users[i].username && password == STORE.users[i].password) {
        const user_id = STORE.users[i].user_id;
        this.setState({
          user_id: STORE.users[i].user_id,
          prescriptions: STORE.prescriptions[user_id].prescripts
        });
      }
    }
  }

  // componentDidMount() {
    
  // }

  createLanding(){
    if (this.state.user_id == ''){
      return (
        <Login />
      )
    }
  }

  createMainRoutes(){
    if (this.state.user_id != ''){
      return (
        <List />
      )
    }
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

export default withRouter(App)