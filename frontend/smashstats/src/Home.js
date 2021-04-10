import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './Components/NavigationBar'

function HomeScreen() {
  const [topTemp, setTopTemp] = useState('topplayers');
  //Time Temporary Function
  useEffect(() => {
    fetch('/advanced/topplayers').then(res => res.json()).then(data => {
      setTopTemp(data);
    });
  }, []);

  return (
    <div>
        <p>Hello! </p>
        <p></p>
        <p>This is the home screen</p>
        <p>The current time is {topTemp}.</p>
    </div>
  );
}

export default HomeScreen;
