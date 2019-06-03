import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import AddNewTask from './AddNewTask';

const TodosContainer = styled.div`
    width: 600px;
    margin: 50px auto;
    padding: 24px 0;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

export class Todos extends React.Component {
    state = {
        todos: []
    };

    async componentWillMount() {
        const data = await fetch('http://localhost:3001/todos').then(res =>
            res.json()
        );
        this.setState({
            todos: data
        });
    }

    updateSingleTodo = async (id, key, newValue) => {
        const updatedState = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo[key] = newValue;
            }
            return todo;
        });

        const res = await fetch('http://localhost:3001/todos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [key]: newValue
            })
        });
        if (res.status === 200) {
            this.setState({
                todos: updatedState
            });
        } else {
            alert('try again!');
        }
    };

    updateTodosState = newTodoObject => {
        this.setState({
            todos: [...this.state.todos, newTodoObject]
        });
    };

    removeTodo = id => {
        // remove todo from state
        const updatedTodos = this.state.todos.filter(todo => {
            if (todo.id === id) return false;
            return true;
        });
        this.setState({
            todos: updatedTodos
        });

        // update db
        fetch('http://localhost:3001/todos/' + id, {
            method: 'DELETE'
            // headers: {
            //     'Content-Type': 'application/json'
            // },
        });
    };

    render() {
        return (
            <TodosContainer>
                <AddNewTask updateTodosState={this.updateTodosState} />
                <ul>
                    {this.state.todos.map(todo => (
                        <TodoItem
                            updateSingleTodo={this.updateSingleTodo}
                            removeTodo={this.removeTodo}
                            todo={todo}
                            key={todo.id}
                        />
                    ))}
                </ul>

                {!this.state.todos.length ? <div>Sorry.</div> : ''}
            </TodosContainer>
        );
    }
}

export default Todos;
