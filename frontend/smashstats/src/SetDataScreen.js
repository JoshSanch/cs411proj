import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './Components/NavigationBar'

function SetDataScreen() {
  return (
    <div>
        <p>In set screen</p>
    </div>
  );
}

export default SetDataScreen;
