import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Component } from 'react';
import { Link, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import NavigationBar from './Components/NavigationBar'

function HomeScreen() {
  const [topTemp, setTopTemp] = useState('topplayers');
  //Time Temporary Function
  useEffect(() => {
    fetch('/toplayers').then(res => res.json()).then(data => {
      setTopTemp(data.result);
    });
  }, []);

  return (
    <div>
        <p>Hello! </p>
        <p></p>
        <p>This is the home screen</p>
        <p>QUERY: {topTemp}.</p>
    </div>
  );
}

export default HomeScreen;
