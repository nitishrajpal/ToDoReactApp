import React, { Component } from 'react';
import './ToDoList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToDo from './AddToDo';

class ToDoList extends Component {

    state = {
        todos: [
            { Id: '1', Title: 'Push code to github', Status: 'Done' },
            { Id: '2', Title: 'Email to manager', Status: 'Pending' }
        ],
        showForm: false
    };

    onDeleteHandler = (id) => {
        const filteredItems = this.state.todos.filter( item =>  item.Id !== id  );

        this.setState({ todos: filteredItems });
    }

    onEditHandler = (id) => {
        this.setState(state => ({
            ...state,
            todos: state.todos.map( todo => {
                if( todo.Id === id){
                    return {
                        ...todo,
                        Status: todo.Status === "Pending" ? "Done" : "Pending"
                    }
                }
                else{
                    return todo;
                }
            })
        }));
    }

    onAddHandler = (data) => {
        this.setState({ 
            todos: [...this.state.todos, data]
        });
    };

    showFormHandler = () => {
        this.setState({ showForm: true });
    };

    closeFormHandler = () => {
        this.setState({ showForm: false });
    }

    render() {
        return(
            <div>
                <h1>To Do List</h1>
                <button type="button" className="btn-primary" onClick={this.showFormHandler}>Add To Do</button>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(item => {
                            return (
                                <tr key={item.Id}>
                                   <td>{item.Id}</td>
                                   <td>{item.Title}</td> 
                                   <td style={ item.Status === "Pending" ? { color: 'red', fontWeight: 'bold'} : { color: 'green', fontWeight: 'bold' } }>{item.Status}</td> 
                                   <td>
                                        <button className="btn btn-primary" onClick={ () => this.onDeleteHandler(item.Id) }>
                                            <span>
                                                <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                            </span>
                                        </button>
                                        <button className="btn btn-primary" onClick={ () => this.onEditHandler(item.Id) }>
                                            <span>
                                                <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <AddToDo show={this.state.showForm} close={this.closeFormHandler} onAdd = { this.onAddHandler }/>
            </div>
        );
    }
}

export default ToDoList;