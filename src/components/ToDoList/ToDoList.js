import React, { Component } from 'react';
import axios from 'axios';
import './ToDoList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToDo from '../AddToDo/AddToDo';
import { Route } from 'react-router-dom';

class ToDoList extends Component {

    state = {
        todos: []
    };

    componentDidMount(){
        //console.log(this.props);
        // if(this.props.addNew){
        //     this.setState({ todos: [...this.state.todos, this.props.addNew] });
        // }
        axios.get('https://todoreactapp-a410d-default-rtdb.firebaseio.com/todos.json')
        .then(res => {
            const fetchedTodos = [...this.state.todos];
            for(let key in res.data){
                fetchedTodos.push({
                    ...res.data[key],
                    Id: key
                });
            };
            this.setState({todos: fetchedTodos});
        })
    }

    onDeleteHandler = (id) => {

        axios.delete(`https://todoreactapp-a410d-default-rtdb.firebaseio.com/todos/${id}.json`)
        .then(res=>{
            const filteredItems = this.state.todos.filter( item =>  item.Id !== id  );

            this.setState({ todos: filteredItems });
        });
    }

    onEditHandler = (id) => {

        let updatedToDo = null;
        this.state.todos.map(todo => {
            if(todo.Id === id){
                updatedToDo = { ...todo, Status: todo.Status === "Pending" ? "Done" : "Pending" };
                axios.put(`https://todoreactapp-a410d-default-rtdb.firebaseio.com/todos/${id}.json`, updatedToDo)
                .then(res =>{});
            }
            return updatedToDo;
        });

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

    // showFormHandler = () => {
    //     this.setState({ showForm: !this.state.showForm });
    // };

    // closeFormHandler = () => {
    //     this.setState({ showForm: false });
    // }

    render() {
        return(
            <div>
                {/* <button type="button" className="btn-primary" onClick={this.showFormHandler}>Add To Do</button> */}
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(item => {
                            return (
                                <tr key={item.Id}>
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
                {/* <AddToDo show={this.state.showForm} close={this.closeFormHandler} onAdd = { this.onAddHandler }/> */}
                <Route path="/newToDo" component={ () => <AddToDo show={this.state.showForm} close={this.closeFormHandler} onAdd = { this.onAddHandler }/> } />
            </div>
        );
    }
}

export default ToDoList;