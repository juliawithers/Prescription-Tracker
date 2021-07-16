import React, { Component } from 'react';
import context from '../context';
import List from '../List/List';
import Login from '../Login/Login';

export default class HandleLanding extends Component {

    // validation code here
    static contextType = context;

    createLanding() {
        console.log('createLanding ran');
        if (this.context.backClick === true) {
            console.log('createLanding backclick true ran');
            return (
                <List />
            )
        }
        if (this.context.login === false) {
            console.log('createLanding login false ran');
            return (
                <Login />
            )
        } else if (this.context.login === true) {
            console.log('createLanding login true ran');
            return (
                <List />
            )
        }
    }

    render() {
        return (
            <div className="component-div">
                {this.createLanding()}
            </div>
        )
    }
}