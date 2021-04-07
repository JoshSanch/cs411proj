import React from 'react';
import { Navbar, Nav, Form, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import SetDataScreen from '../SetDataScreen.js';
import App from '../App';
class NavigationBar extends React.Component {
    state = { clicked: false }
    render() {
        return (
            <div>
            <Router>
                <Navbar collapseOnSelect expand="lg" id="color-nav" fixed="top">
                    <Navbar.Brand as={NavLink} to="/" id="color-nav-logo"><i className="fas fa-running"></i> Team 86</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="ml-auto" id = "color-nav-links">
                            <Nav.Link href="Home">Home</Nav.Link>
                            <Nav.Link href="#">Smash Set Data</Nav.Link>
                            <Nav.Link href="#">Smash Game Data</Nav.Link>
                            <Nav.Link href="#">Smash Player Data</Nav.Link>
                            <Nav.Link href="#">Smash Character Data</Nav.Link>
                            <Nav.Link href="#">Smash Stage Data</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Router>
            </div>
        )
    };
}
export default NavigationBar;
