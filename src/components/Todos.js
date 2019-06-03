import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddNewTask from "./AddNewTask";

const TodosContainer = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 24px 0;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

export class Todos extends React.Component {
  render() {
    return (
      <TodosContainer>
        <AddNewTask />
        <ul>
          {this.props.todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </TodosContainer>
    );
  }
}

// const todosContainer = {
//     padding: '30px'
// }
// const todosList = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: '20px 0'
// }

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
