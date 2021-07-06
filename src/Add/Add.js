import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import context from '../context';

export default class Add extends Component {

    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            prescriptionName: '',
            quantity: '',
            doctorName: '',
            datePrescribed: '',
            dateToRefill: '',
            dateToRenew: '',
        }
    }

    updateInputs = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'prescription-name') {
            this.setState({
                prescriptionName: value
            });
        }
        if (id === 'quantity') {
            this.setState({
                quantity: value
            });
        }
        if (id === 'doctor') {
            this.setState({
                doctorName: value,
            });
        }
        if (id === 'date-prescribed') {
            this.setState({
                datePrescribed: value
            });
        }
        if (id === 'date-to-refill') {
            this.setState({
                dateToRefill: value
            });
        }
        if (id === 'date-to-renew') {
            this.setState({
                dateToRenew: value
            })
        }
        this.setState({
            message: ''
        });
    }

    handleSubmitPrescription= () => {
        // temporary script to handle id # of prescription
        let newID = this.context.prescriptions.length +1;

        const scriptObj = {
            id: newID,
            prescription_name: this.state.prescriptionName,
            quantity: this.state.quantity,
            doctor: this.state.doctorName,
            date_prescribed: this.state.datePrescribed,
            date_to_refill: this.state.dateToRefill,
            date_to_renew: this.state.dateToRenew 
        }

        // temporary script to append to the context object
        console.log(scriptObj);
        this.context.prescriptions.push(scriptObj);
        this.props.history.push('/')
    }

    handleBack = () => {
        // this.context.backClick = true;
        this.context.handleBackClick(true);
    }


    render() {
        return (
            <div>
                <button onClick={this.handleBack}>Back</button>
                <form onSubmit={this.handleSubmitPrescription}>
                    <label htmlFor="prescription-name">Prescription Name:</label>
                    <input name="prescription-name" defaultValue="" id="prescription-name" onChange={this.updateInputs} />
                    <label htmlFor="quantity">Quantity:</label>
                    <input name="quantity" defaultValue="" id="quantity" onChange={this.updateInputs} />
                    <label htmlFor="doctor">Doctor Name:</label>
                    <input name="doctor" defaultValue="" id="doctor" onChange={this.updateInputs} />
                    <label htmlFor="date-prescribed">Date Prescribed:</label>
                    <input name="date-prescribed" defaultValue="" id="date-prescribed" onChange={this.updateInputs} />
                    <label htmlFor="date-to-refill">Date to Refill by:</label>
                    <input name="date-to-refill" defaultValue="" id="date-to-refill" onChange={this.updateInputs} />
                    <label htmlFor="date-to-renew">Date to Renew by:</label>
                    <input name="date-to-renew" defaultValue="" id="date-to-renew" onChange={this.updateInputs} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

// export default withRouter(Add)