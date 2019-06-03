import React from 'react';
import Todos from './components/Todos'
import './App.css';

class App extends React.Component {
  state = {
    todos: [
      {
        title: "Lorem Title #1",
        completed: false,
        id: 1
      },
      {
        title: "Lorem Title #2",
        completed: true,
        id: 2
      },
      {
        title: "Lorem Title #3",
        completed: false,
        id: 3
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}



export default App;
