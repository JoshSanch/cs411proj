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
                <Navbar collapseOnSelect expand="lg" id="color-nav" fixed="top" variant="dark" bg="dark">
                    <Navbar.Brand as={NavLink} to="Home" id="color-nav-logo"><i className="fas fa-running"></i> Team 86</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto" id = "color-nav-links">
                            {/* <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/Sets">Set Data</Link>
                            <Link className="nav-link" to="/">Game Data</Link>
                            <Link className="nav-link" to="/">Player Data</Link>
                            <Link className="nav-link" to="/">Character Data</Link>
                            <Link className="nav-link" to="/">Stage Data</Link> */}

                            <Nav.Link href="Home">Home</Nav.Link>
                            <Nav.Link href="Sets">Set Data</Nav.Link>
                            <Nav.Link href="Games">Game Data</Nav.Link>
                            <Nav.Link href="Players">Player Data</Nav.Link>
                            <Nav.Link href="Characters">Character Data</Nav.Link>
                            <Nav.Link href="Stages">Stage Data</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Router>
            </div>
        )
    };
}
export default NavigationBar;