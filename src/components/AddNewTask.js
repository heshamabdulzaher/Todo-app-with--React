import React, { Component } from "react";
import styled from "styled-components";

const AddNewTaskStyles = styled.section`
  width: calc(100% - 48px);
  height: 56px;
  padding: 0 10px;
  margin: 0 auto 24px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    border: 0;
    outline: 0;
  }
  input {
    height: 100%;
    font-size: 16px;
    width: calc(100% - 120px);
  }
  button {
    width: 100px;
    height: 40px;
    background-color: var(--mainColor);
    color: #222;
    border-radius: 2px;
    font-weight: 500;
    font-size: 18px;
  }
`;

export class AddNewTask extends Component {
  render() {
    return (
      <AddNewTaskStyles>
        <input type="text" placeholder="What do you want to do?" />
        <button>ADD</button>
      </AddNewTaskStyles>
    );
  }
}

export default AddNewTask;
