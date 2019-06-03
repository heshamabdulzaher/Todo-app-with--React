import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
        &:hover {
            button {
                opacity: 1;
            }
        }
        &.completed {
            text-decoration: line-through;
            color: #787878;
        }
        input {
            width: 15px;
            height: 15px;
            border-radius: 2px;
            border: 1px solid #e4e4e4;
            margin-right: 10px;
        }
        button {
            opacity: 0;
            position: absolute;
            top: 50%;
            right: 20px;
            font-size: 12px;
            border: 0;
            background-color: transparent;
            transform: translateY(-50%);
            cursor: pointer;
            background-color: red;
            color: #fff;
            width: 15px;
            height: 15px;
            line-height: 15px;
            border-radius: 50%;
        }
    }
`;

class TodoItem extends Component {
    render() {
        return (
            <TodoItemStyles>
                <label
                    className={this.props.todo.completed ? 'completed' : ''}
                    htmlFor={this.props.todo.id}
                >
                    <input
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={() => {
                            this.props.updateSingleTodo(
                                this.props.todo.id,
                                'completed',
                                !this.props.todo.completed
                            );
                        }}
                        id={this.props.todo.id}
                    />
                    {this.props.todo.title}
                    <button
                        onClick={() => {
                            this.props.removeTodo(this.props.todo.id);
                        }}
                    >
                        x
                    </button>
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
