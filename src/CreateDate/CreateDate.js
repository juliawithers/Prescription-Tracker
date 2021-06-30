import React, { Component } from 'react';

export default class CreateDate extends Component {
    createDate=()=>{
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

        this.setState({
            fullDate: fullDate
        });
    }
    

    render() {
        return (
            <p>{this.state.fullDate}</p>
        )
    }
}