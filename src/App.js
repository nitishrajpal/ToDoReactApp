import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TodoApplication from './components/ToDoApplication/ToDoApplication';
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit, faPlus);


class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <div className="App">
        <TodoApplication/>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
