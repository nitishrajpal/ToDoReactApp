import React, { Component } from 'react';
import './AddToDo.css'

class AddToDo extends Component {

    state = {
        Id: "",
        Title: "",
        Status: "Pending"
    };

    // componentDidMount(){
    //     console.log(this.props);
    // }

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
        this.props.onAdd({
            Id: this.state.Id,
            Title: this.state.Title,
            Status: this.state.Status
        });

        this.setState({
            Id: "",
            Title: "",
            Status: "Pending"
        });
    };

    render() {

        //let showAddForm = null;
           let showAddForm = (
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
                    <button type="button" id="closeForm" onClick={this.props.close} className="form-control btn btn-primary">Done</button>
                </form>
            );

        return(
            <div>
                {showAddForm}
            </div>
        );
    }
}

export default AddToDo;