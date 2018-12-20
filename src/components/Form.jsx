import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault();
        const { title } = this.state
        
        if ( title ) {
            this.props.onAdd(title);
            this.setState({
                title: ''
            })
        }
    }

    handleChange ({ target }) {
        this.setState({
            title: target.value
        })
    }

    render() {
        return (
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <input value={this.state.title} 
                        type="text" 
                        placeholder="Что нужно сделать?" 
                        onChange={this.handleChange}/>

                <Button type="submit">Добавить</Button>
            </form>
        )
    }
}

Form.propTypes = {
    onAdd: PropTypes.func.isRequired
}