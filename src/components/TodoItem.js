import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import deleteIcon from "../assets/delete.svg";

const TodoItemStyles = styled.li`
  list-style-type: none;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e4e4e4;
  padding: 10px 24px;
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    .delete_icon {
      opacity: 1;
    }
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 1px solid #e4e4e4;
    margin-right: 10px;
  }
  input[type="text"] {
    user-select: none;
    width: calc(100% - 40px);
    border: 0;
    font-size: 16px;
    background-color: transparent;
    &.completed {
      text-decoration: line-through;
      color: #787878;
    }
  }
  .delete_icon {
    height: 25px;
    width: 25px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    img {
      width: 12px;
    }
  }
`;

class TodoItem extends Component {
  state = {
    titleText: ""
  };
  componentWillMount() {
    this.setState({ titleText: this.props.todo.title });
  }

  updateMyInfo = async e => {
    if (e.target.getAttribute("type") === "text") {
      await this.setState({ titleText: e.target.value });
      await this.props.updateSingleTodo(
        this.props.todo.id,
        "title",
        this.state.titleText
      );
    } else if (e.target.getAttribute("type") === "checkbox") {
      this.props.updateSingleTodo(
        this.props.todo.id,
        "completed",
        !this.props.todo.completed
      );
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  remove = () => {
    // console.log(this.props.todo);
    this.props.deleteTodoItem(this.props.todo.id);
    // this.props.deleteTodoItem();
  };

  render() {
    return (
      <TodoItemStyles>
        <input
          type="checkbox"
          checked={this.props.todo.completed}
          onChange={this.updateMyInfo}
        />
        <input
          type="text"
          className={this.props.todo.completed ? "completed" : ""}
          value={this.state.titleText}
          onChange={this.updateMyInfo}
          onKeyPress={this.handleKeyPress}
        />
        <div className="delete_icon" onClick={this.remove}>
          <img src={deleteIcon} alt="delete icon" />
        </div>
      </TodoItemStyles>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
