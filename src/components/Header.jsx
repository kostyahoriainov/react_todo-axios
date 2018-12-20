/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Stats from './Stats';
import Stopwatch from './Stopwatch';

const Header = ({ title, todos}) => 
    <header>
        <Stats todos={todos} />
        <h1>{title}</h1>
        <Stopwatch />
    </header>

Header.propTypes = {
    title: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired
}

export default Header