import React, { Component } from 'react';
import styled from 'styled-components';

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
        cursor: pointer;
        &:disabled {
            cursor: not-allowed;
        }
    }
`;

export class AddNewTask extends Component {
    state = {
        newTodoText: ''
    };

    handleChange = e => {
        this.setState({
            newTodoText: e.target.value
        });
    };

    postTodo = async () => {
        const newTodo = {
            title: this.state.newTodoText,
            completed: false
        };

        const savedTodo = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        }).then(res => res.json());

        if (savedTodo.id) {
            // reset form
            this.setState({
                newTodoText: ''
            });

            // pass new todo to parent
            this.props.updateTodosState(savedTodo);
        }
    };

    render() {
        return (
            <AddNewTaskStyles>
                <input
                    value={this.state.newTodoText}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="What do you want to do?"
                />
                <button
                    onClick={this.postTodo}
                    style={{
                        opacity: this.state.newTodoText === '' ? 0.5 : 1
                    }}
                    disabled={!this.state.newTodoText}
                >
                    ADD
                </button>
            </AddNewTaskStyles>
        );
    }
}

export default AddNewTask;
