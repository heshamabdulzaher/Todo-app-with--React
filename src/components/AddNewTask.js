import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AddNewTaskStyles = styled.form`
  width: calc(100% - 48px);
  height: 56px;
  padding: 0 10px;
  margin: 0 auto 24px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    border: 0;
    outline: 0;
  }
  input[type="text"] {
    height: 100%;
    font-size: 16px;
    width: calc(100% - 120px);
  }
  input[type="submit"] {
    width: 100px;
    height: 40px;
    background-color: var(--mainColor);
    color: #222;
    border-radius: 2px;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export class AddNewTask extends Component {
  state = {
    newTodoValue: ""
  };

  getInputValue = e => {
    this.setState({ newTodoValue: e.target.value });
  };
  postNewTodoItem = async () => {
    const newTodo = {
      title: this.state.newTodoValue,
      completed: false
    };
    // POST the new todo item
    const newTodoItem = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    }).then(res => res.json());

    // Reset the input
    this.setState({ newTodoValue: "" });

    // Pass the new todo object to the parent
    this.props.receiveNewTodoItem(newTodoItem);
  };

  render() {
    return (
      <AddNewTaskStyles
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={this.state.newTodoValue}
          placeholder="What do you want to do?"
          onChange={this.getInputValue}
        />
        <input
          type="submit"
          disabled={this.state.newTodoValue === ""}
          onClick={this.postNewTodoItem}
          value="ADD"
        />
      </AddNewTaskStyles>
    );
  }
}

AddNewTaskStyles.propTypes = {
  todos: PropTypes.func
};

export default AddNewTask;
