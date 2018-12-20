/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios'; 

import PropTypes from 'prop-types';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount () {
    axios.get('http://localhost:3000/api/todos')
      .then(response => response.data)
      .then(todos => this.setState({
        todos
      }))
      .catch(this.handleError);
  }

  handleToggle (id) {
    axios.patch(`/api/todos/${id}`)
      .then(response => {
        this.setState(({ todos }) => ({
          todos: todos.map(todo => todo.id === id? {...todo, completed: response.data.completed} : todo)
        }))
      })
      .catch(this.handleError);

  }

  handleDelete (id) {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        this.setState(({ todos }) => ({
          todos: todos.filter(todo => todo.id !== id)
        }))
      })
      .catch(this.handleError)

  }

  handleAdd(title) {
    axios.post('/api/todos', { title })
      .then(response => response.data)
      .then(todo => {
        this.setState(({todos}) => ({
          todos: [...todos, todo]
        }))
      })
      .catch(this.handleError)



  }

  handleEdit (id, title) {
    axios.put(`/api/todos/${id}`, { title })
      .then(response => {
        this.setState(({ todos }) => ({
          todos: todos.map(todo => todo.id === id? {...todo, title: response.data.title} : todo)
        }))
      })
      .catch(this.handleError)

  }

  handleError = (error) => console.error(error.message)
 

  render() {
    const { todos } = this.state
    return (
      <main>
        <Header todos={todos} title={this.props.title}/>
        
        <section className="todo-list">

          {todos.map(todo => <Todo 
                                key={todo.id} 
                                id={todo.id}
                                title={todo.title} 
                                completed={todo.completed} 
                                onStatusChange={this.handleToggle}
                                onDelete={this.handleDelete}
                                onEdit={this.handleEdit}
                              />)}

        </section>
        
        <Form onAdd={this.handleAdd}/>

      </main>
    );
  }
}
  
App.propTypes = {
  title: PropTypes.string
}

App.defaultProps = {
  title: 'React Todo'
}

export default App;
