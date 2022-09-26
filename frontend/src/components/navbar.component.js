import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MLB Dashboard</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Players</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/add" className="nav-link">Add Player</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}