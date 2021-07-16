import React, { Component } from 'react';
import context from '../context';
import Edit from '../Edit/Edit';
import Add from '../Add/Add';
// import { withRouter } from 'react-router-dom';

export default class List extends Component {

    // validation code here
    static contextType = context;

    isBackClick = () => {
        if (this.context.backClick === true) {
            this.context.handleRemoveBackClick();
        }
    }

    handleAdd = () => {
        this.context.handleAddClick();
    }

    handleEdit = (e) => {
        // take the id and ind the data associated with this prescription to pass it to the edit component
        const id = Number(e.target.value);
        let scriptEdit = this.context.prescriptions.find(element => {
            if (element.id === id) {
                return {
                    "id": Number(element.id),
                    "prescription_name": element.prescription_name,
                    "quantity": element.quantity,
                    "doctor": element.doctor,
                    "date_prescribed": element.date_prescribed,
                    "date_to_refill": element.date_to_refill,
                    "date_to_renew": element.date_to_renew
                }
            }
        });

        console.log(scriptEdit);
        // pass the script to edit into Edit component using context in App component
        this.context.handleEditClick(scriptEdit);
    }
    // NEED TO DO: 
    // handle count downs by date based off of QTY of pills or whatever, 

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
        return fullDate;
    }

    createListItems = (prescriptions) => {
        return prescriptions.map((item, i) => {
            const { id, prescription_name, quantity, doctor, date_prescribed, date_to_refill, date_to_renew } = item;

            let datePrescribed = this.createDate(date_prescribed);
            let dateRefill = this.createDate(date_to_refill);
            let dateRenew = this.createDate(date_to_renew);

            return (
                <li key={i}>
                    <p name='id' id='id' value={id}>Item: {id}</p>
                    <p name='prescription-name' id='prescription-name' value={prescription_name}>Prescription Name: {prescription_name}</p>
                    <p name='quantity' id='quantity' value={quantity}>Quantity per Prescription: {quantity}</p>
                    <p name='doctor' id='doctor' value={doctor}>Doctor: {doctor}</p>
                    <p name='date-prescribed' id='date-prescribed' value={datePrescribed}>Prescribed on: {datePrescribed}</p>
                    <p name='date-to-refill' id='date-to-refill' value={dateRefill}>Date to Refill: {dateRefill}</p>
                    <p name='date-to-renew' id='date-to-renew' value={dateRenew}>Date to Renew: {dateRenew}</p>
                    <button className="edit-button" value={id} onClick={this.handleEdit}>Edit</button>
                </li>
            )
        })
    }

    renderList() {
        console.log('renderList ran');
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


    render() {
        // console.log(this.context);
        return (
            <div className="component-div">
                {/* {this.context.addClick === false && this.context.editClick === false
                    ? this.renderList()
                    : <div></div>}
                {this.context.addClick === true
                    ? <Add />
                    : <div></div>}
                {this.context.editClick === true
                    ? <Edit />
                    : <div></div>} */}

                {this.context.addClick === false && this.context.editClick === false
                    ? this.renderList()
                    : (this.context.addClick === true
                        ? <Add />
                        : (this.context.editClick === true
                            ? <Edit />
                            :<div></div>))}
            </div>
        )
    }
}