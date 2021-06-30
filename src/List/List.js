import React, { Component } from 'react';

export default class List extends Component {

    // validation code here
    static contextType = context;

    state = {
    //   
    };

    handleChangeInput = e => {
        // const value = e.target.value;
        // const id = e.target.id;
        // if (id === 'login-username') {
        //     this.setState({
        //         username: value
        //     });
        // }
        // if (id === 'login-password') {
        //     this.setState({
        //         password: value
        //     });
        // }
    }

    handleSubmit = e => {
        // e.preventDefault();
        // this.context.handleLoginSubmit(this.state.username, this.state.password);
    }

    // NEED TO DO: 
    // handle count downs by date based off of QTY of pills or whatever, 
    // edit buttons for prescription details,
    // Create a page for editing the prescription and handle the submit

    createDate=(date_entered)=>{
        let dateArr = date_entered.split('-');
        let date = [];
        date.push(dateArr[0])
        if (dateArr[1].length === 1) {
            date.push('0' + dateArr[1]);
        } else {
            date.push(dateArr[1])
        }
        if (dateArr[2].length === 1) {
            date.push('0' + dateArr[2]);
        } else {
            date.push(dateArr[2])
        }
        let fullDate = date.join('-');  

        return fullDate
    }

    createListItems = (prescriptions) => {
        return prescriptions.map((item, i) =>{
            const { id, prescription_name, quantity, doctor, date_prescribed, date_to_refill, date_to_renew } = lineItem;

            datePrescribed = createDate(date_prescribed);
            dateRefill = createDate(date_to_refill);
            dateRenew = createDate(date_to_renew);

            return (
                <li>
                    <p>Item: {id}</p>
                    <p>Prescription Name: {prescription_name}</p>
                    <p>Quantity per Prescription: {quantity}</p>
                    <p>Doctor: {doctor}</p>
                    <p>Prescribed on: {datePrescribed}</p>
                    <p>Date to Refill: {dateRefill}</p>
                    <p>Date to Renew: {dateRenew}</p>
                    <button>Edit</button>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Current Prescription List</h2>
                <ul>
                    {this.createListItems(this.context.prescriptions)}
                </ul>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="login-password">Password: </label>
                        <input className="login-password" type="password" name='login-password' id='login-password' />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}