import React, { Component } from 'react';
import context from '../context';
import Edit from '../Edit/Edit';
import Add from '../Add/Add';

export default class List extends Component {

    // validation code here
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            addClick: false,
            editClick: false
        };
    }

    componentDidMount () {
        this.setState({
            addClick: this.context.addClick,
            editClick: this.context.editClick
        })
    }

    isBackClick = () => {
        if (this.context.backClick === true) {
            this.context.handleRemoveBackClick();
        }
    }

    handleAdd = () => {
        this.context.handleAddClick();
    }

    handleEdit = () => {
        this.context.handleEditClick();
    }
    // NEED TO DO: 
    // handle count downs by date based off of QTY of pills or whatever, 
    // edit buttons for prescription details,
    // Create a page for editing the prescription and handle the submit

    createDate = (date_entered) => {
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
        console.log('createListItems ran');
        console.log(prescriptions);
        console.log(this.state);
        console.log(this.context.addClick);
        return prescriptions.map((item, i) => {
            const { id, prescription_name, quantity, doctor, date_prescribed, date_to_refill, date_to_renew } = item;

            let datePrescribed = this.createDate(date_prescribed);
            let dateRefill = this.createDate(date_to_refill);
            let dateRenew = this.createDate(date_to_renew);

            return (
                <li key={i}>
                    <p>Item: {id}</p>
                    <p>Prescription Name: {prescription_name}</p>
                    <p>Quantity per Prescription: {quantity}</p>
                    <p>Doctor: {doctor}</p>
                    <p>Prescribed on: {datePrescribed}</p>
                    <p>Date to Refill: {dateRefill}</p>
                    <p>Date to Renew: {dateRenew}</p>
                    <button className="edit-button" onClick={this.handleEdit}>Edit</button>
                </li>
            )
        })
    }

    renderList = () => {
        console.log('renderList ran');
        if (this.state.addClick === true || this.state.editClick === true) {
            return (
                <div></div>
            )    
        } else {
            console.log('renderList else ran');
            return (
                <div>
                    <h2>Current Prescription List</h2>
                    <ul>
                        {this.createListItems(this.context.prescriptions)}
                    </ul>
                    <button className="Add-button" onClick={this.handleAdd}>Add</button>
                </div>
            )
        }   
    }


    render() {
        console.log(this.state);
        return (
            <div className="component-div">
                {this.context.addClick === false && this.context.editClick === false
                ? this.renderList()
                : <div></div>}
                {this.context.addClick === true
                ? <Add />
                : <div></div>}
                {this.context.editClick === true
                ? <Edit />
                : <div></div>}
            </div>
        )
    }
}