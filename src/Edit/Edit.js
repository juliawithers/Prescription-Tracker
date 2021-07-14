import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import context from '../context';

export default class Add extends Component {

    // need to pass the information to this component
    // need to create that in List


    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            prescriptionName: '',
            quantity: '',
            doctorName: '',
            datePrescribed: '',
            dateToRefill: '',
            dateToRenew: ''
        }
    }

    componentDidMount=()=>{
        const script = this.context.scriptEdit;
        this.setState({
            id: script.id,
            prescriptionName: script.prescription_name,
            quantity: script.quantity,
            doctorName: script.doctor,
            datePrescribed: script.date_prescribed,
            dateToRefill: script.date_to_refill,
            dateToRenew: script.date_to_renew
        })
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

    handleSubmitPrescription= e => {
        e.preventDefault();

        const scriptObj = {
            id: this.state.id,
            prescription_name: this.state.prescriptionName,
            quantity: this.state.quantity,
            doctor: this.state.doctorName,
            date_prescribed: this.state.datePrescribed,
            date_to_refill: this.state.dateToRefill,
            date_to_renew: this.state.dateToRenew 
        }

        // temporary script to cut and insert the context object
        // may need to create an "order" to the prescriptions so we can insert at the correct point
        console.log(scriptObj);
        this.context.prescriptions.splice(scriptObj.id-1,1,scriptObj);
        this.props.history.push('/');
    }

    handleBack = () => {
        // this.context.backClick = true;
        this.context.handleBackClick(true);
    }


    render() {
        console.log(this.context.scriptEdit);
        return (
            <div>
                <h2>Edit Prescription</h2>
                <button onClick={this.handleBack}>Back</button>
                <form onSubmit={this.handleSubmitPrescription}>
                    <label htmlFor="prescription-name">Prescription Name:</label>
                    <input name="prescription-name" defaultValue={this.context.scriptEdit.prescription_name} id="prescription-name" onChange={this.updateInputs} />
                    <label htmlFor="quantity">Quantity:</label>
                    <input name="quantity" defaultValue={this.context.scriptEdit.quantity} id="quantity" onChange={this.updateInputs} />
                    <label htmlFor="doctor">Doctor Name:</label>
                    <input name="doctor" defaultValue={this.context.scriptEdit.doctor} id="doctor" onChange={this.updateInputs} />
                    <label htmlFor="date-prescribed">Date Prescribed:</label>
                    <input name="date-prescribed" defaultValue={this.context.scriptEdit.date_prescribed} id="date-prescribed" onChange={this.updateInputs} />
                    <label htmlFor="date-to-refill">Date to Refill by:</label>
                    <input name="date-to-refill" defaultValue={this.context.scriptEdit.date_to_refill} id="date-to-refill" onChange={this.updateInputs} />
                    <label htmlFor="date-to-renew">Date to Renew by:</label>
                    <input name="date-to-renew" defaultValue={this.context.scriptEdit.date_to_renew} id="date-to-renew" onChange={this.updateInputs} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}