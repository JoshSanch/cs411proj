import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import SetDataScreen from './SetDataScreen'
function App() {
  return (
    <div className="App">
        <Router>
        <NavigationBar/>
        <Route exact path="../Smash Set Data" component={SetDataScreen} />
        </Router>
    </div>
  );
}

export default App;
