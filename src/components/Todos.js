import React from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import AddNewTask from "./AddNewTask";

const TodosContainer = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 24px 0 0;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  p {
    color: #333;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    padding: 15px 0;
  }
`;

export class Todos extends React.Component {
  state = {
    todos: []
  };

  async componentWillMount() {
    const data = await fetch("http://localhost:4000/todos").then(res =>
      res.json()
    );
    this.setState({ todos: data });
  }

  receiveNewTodoItem = newItem => {
    this.setState({
      todos: [...this.state.todos, newItem]
    });
  };

  updateSingleTodo = async (id, key, newValue) => {
    // Update db
    const patchTodos = await fetch("http://localhost:4000/todos/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        [key]: newValue
      })
    });

    // If DB updated
    if (patchTodos.status >= 200 || patchTodos.status < 300) {
      // Update changes locally
      let updatedTodos = this.state.todos.map(todo => {
        if (todo.id === id) {
          todo[key] = newValue;
        }
        return todo;
      });
      this.setState({ todos: updatedTodos });
    }
  };

  removeTodoItem = id => {
    let updatedTodos = this.state.todos.filter(todo => {
      if (todo.id === id) return false;
      return true;
    });
    this.setState({ todos: updatedTodos });
    fetch("http://localhost:4000/todos/" + id, {
      method: "DELETE"
    });
  };

  render() {
    return (
      <TodosContainer>
        <AddNewTask receiveNewTodoItem={this.receiveNewTodoItem} />
        <ul>
          {this.state.todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              updateSingleTodo={this.updateSingleTodo}
              removeTodoItem={this.removeTodoItem}
            />
          ))}
        </ul>
        <p>
          If you spend too much time thinking about a thing, you'll never get it
          done.
        </p>
      </TodosContainer>
    );
  }
}

export default Todos;
