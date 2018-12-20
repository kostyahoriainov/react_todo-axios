import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Button from './Button';

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate () {
        if (this.state.editing) {
            this.newTitle.focus();
            this.newTitle.select();
        }
    }
    
    handleSubmit (event) {
        event.preventDefault();
        const title = this.newTitle.value;

        this.props.onEdit(this.props.id, title);
        this.setState({
            editing: false
        })
    }

    renderDisplay () {
        const { title, completed, id, onStatusChange, onDelete } = this.props;
        return (
            <div className={`todo ${completed ? 'completed' : ''}`}>
    
                <Checkbox checked={completed} onChange={() => onStatusChange(id)} />
    
                <span className="todo-title">{title}</span>

                <Button className="edit icon" icon="edit" onClick={() => this.setState({editing: true})}/>

                <Button icon="delete" className="delete icon" onClick={() => onDelete(id)}/>
    
            </div>
        )
    }

    renderForm () {
        const { title } = this.props;
        return (
            <form className="todo-edit-form" onSubmit={this.handleSubmit}>
                <input ref={newTitle => {this.newTitle = newTitle}} type="text" defaultValue={title}/>
                <Button className="save icon" icon="save" type="submit" />
            </form>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}

Todo.propTypes = {
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default Todo