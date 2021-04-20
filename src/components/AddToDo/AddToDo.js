import React, { Component } from 'react';
import axios from 'axios';
import './AddToDo.css'

class AddToDo extends Component {

    state = {
        Id: "",
        Title: "",
        Status: "Pending",
        showSuccessMessage: false
    };

    titleChangedHandler = (event) => {
        this.setState({
            Title: event.target.value
        });
    };

    statusChangedHandler = (event) => {
        this.setState({
            Status: event.target.value
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post('https://todoreactapp-a410d-default-rtdb.firebaseio.com/todos.json', this.state)
        .then(res => {
            this.setState({ Id: res.data.name, showSuccessMessage: true })
            setTimeout(()=>{
                this.setState({ showSuccessMessage: false })
            }, 2000);
        })

        this.setState({
            Id: "",
            Title: "",
            Status: "Pending"
        });
    };

    render() {

        let successMessage = null;
        if(this.state.showSuccessMessage){
            successMessage = (
                <div className="alert alert-success" role="alert">
                    Task added Successfully!
                </div>
            );
        }
        return(
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={this.state.Title} onChange={this.titleChangedHandler} className="form-control" placeholder="Enter Title" />
                    </div>
                    <div className="form-group">
                    <label>Status</label>
                        <select className="form-control" value={this.state.Status} onChange={this.statusChangedHandler} >
                                <option value="Done" >Done</option>
                                <option value="Pending" >Pending</option>
                        </select>
                    </div>
                    <button type="submit" id="submitForm" className="form-control btn btn-primary">Add</button>
                </form>
                {successMessage}
            </div>
        );
    }
}

export default AddToDo;