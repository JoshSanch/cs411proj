import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './Components/NavigationBar'

function GameDataScreen() {
  return (
    <div>
        <p>Hello! </p>
        <p></p>
        <p>This is the game data screen</p>
        
    </div>
  );
}

export default GameDataScreen;