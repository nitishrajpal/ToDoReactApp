import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import ToDoList from '../ToDoList/ToDoList';
import AddToDo from '../AddToDo/AddToDo';
import './ToDoApplication.css';

class TodoApplication extends Component {

    state = {
        todos: []
    };

    onAddHandler = (data) => {
        axios.post('https://todoreactapp-a410d-default-rtdb.firebaseio.com/todos.json', data)
        .then(res => {
            data.Id = res.data.name;
            this.setState({ 
                todos: [...this.state.todos, data]
            });
        })
    };

    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/newTodo">New ToDo</NavLink></li>
                            <li><NavLink to="/auth">Authentication</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={() => <ToDoList addNew={this.state.todos} />} />
                <Route path="/newTodo" component={() => <AddToDo onAdd={this.onAddHandler} />} />
            </div>
        );
    }
}

export default TodoApplication;