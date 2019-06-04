import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TodoItemStyles = styled.li`
  list-style-type: none;
  background-color: #f2f2f2;
  border-bottom: 1px solid #e4e4e4;
  label {
    padding: 10px 24px;
    position: relative;
    user-select: none;
    display: flex;
    align-items: center;
    &.completed {
      text-decoration: line-through;
      color: #787878;
    }
  }
  input {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 1px solid #e4e4e4;
    margin-right: 10px;
  }
`;

class TodoItem extends Component {
  render() {
    console.log();
    return (
      <TodoItemStyles>
        <label
          className={this.props.todo.completed ? "completed" : ""}
          htmlFor={this.props.todo.id}
        >
          <input
            type="checkbox"
            checked={this.state.completed}
            id={this.props.todo.id}
          />
          {this.props.todo.title}
        </label>
      </TodoItemStyles>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
