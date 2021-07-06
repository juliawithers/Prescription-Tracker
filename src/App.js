import React, { Component } from 'react';
import { Route, Link, NavLink, withRouter } from 'react-router-dom';
import context from './context';
// import config from './config';
import STORE from './STORE';
import Login from './Login/Login';
import List from './List/List';
import PrescriptionDetails from './PrescriptionDetails/PrescriptionDetails';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import Hamburger from './pictures/hamburger.png';
import xOut from './pictures/x_out.png';
import './App.css';


export default class App extends Component {

  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      prescriptions: [],
      menu: '',
      click: '',
      login: false,
      backClick: '',
      addClick: '',
      editClick: '',
      handleLoginSubmit: () => { },
      handleBackClick: () => { },
      handleRemoveBackClick: () => { },
      handleAddClick: ()=>{}
    }
  }

  handleLoginSubmit = (username, password) => {
    this.setState({
      addClick: false,
      editClick: false,
      backClick: false
    });

    let length = STORE.users.length - 1;
    for (let i = 0; length; i++) {
      let user = STORE.users[i];
      if (username === user.username && password === user.passw) {
        this.setState({
          user_id: user.user_id,
          prescriptions: this.getUserScripts(user.user_id),
          login: true
        });
        return
      }
    }
  }

  getUserScripts = (userID) => {
    let elements = STORE.prescriptions;
    for (let i = 0; elements.length - 1; i++) {
      if (elements[i].user_id === userID) {
        return elements[i].prescripts;
      } else {
        return 'no prescriptions listed';
      }
    }
  }

  createLanding = (backClick) => {
    console.log('createLanding ran');
    if (backClick === true) {
      console.log('createLanding backClick if ran')
      this.setState({
        addClick: false,
        editClick: false
      })
      return (
        <List />
      )
    }
    if (this.state.login === false) {
      console.log('createLanding if Login ran');
      return (
        <Login />
      )
    } else if (this.state.login === true) {
      console.log('createLanding else if ran');
      return (
        <List />
      )
    }
  }

  createMainRoutes() {
    return (
      <>
        <Route
          exact
          path="/PrescriptionList"
          component={List}
        />
        <Route
          exact
          path="/PrescriptionAdd" component={Add}
        />
        <Route
          exact
          path="/PrescriptionEdit"
          component={Edit}
        />
        <Route
          exact
          path="/PrescriptionDetails"
          component={PrescriptionDetails}
        />
      </>
    )
  }

  menuClick = () => {
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

  createNavRoutes = () => {
    return (
      <div className="navigation">
        <button>Logout</button>
      </div>
    )
  }

  handleBackClick = (input) => {
    console.log('handleBackClick ran');
    console.log(context);
    this.setState({
      backClick: input
    });
    this.createLanding(input);
  }

  handleRemoveBackClick = () => {
    this.setState({
      backClick: false,
      addClick: false,
      editClick: false

    });
  }

  render() {
    console.log(this.state);
    // let status = this.createLanding();
    const contextValue = {
      user_id: this.state.user_id,
      prescriptions: this.state.prescriptions,
      login: this.state.login,
      backClick: this.state.backClick,
      addClick: this.state.addClick,
      editClick: this.state.editClick,
      handleLoginSubmit: this.handleLoginSubmit,
      handleBackClick: this.handleBackClick,
      handleRemoveBackClick: this.handleRemoveBackClick
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
          <header><h1>Prescription Tracker</h1></header>
          <nav role="navigation">
            <div className="small-screen">
              {this.hamburgerClick()}
              {menu}
            </div>
            {bigMenu}
          </nav>
          <main>
            {/* {status} */}
            {this.createLanding()}
            {this.createMainRoutes()}
          </main>
        </div>
      </context.Provider>
    )
  }
}