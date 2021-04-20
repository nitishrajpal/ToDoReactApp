import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import ToDoList from '../ToDoList/ToDoList';
import AddToDo from '../AddToDo/AddToDo';
import './ToDoApplication.css';

class TodoApplication extends Component {
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
                <Route path="/" exact component={ToDoList} />
                <Route path="/newTodo" component={AddToDo} />
            </div>
        );
    }
}

export default TodoApplication;