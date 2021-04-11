import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import SetDataScreen from './SetDataScreen'
import HomeScreen from './Home'
import GameDataScreen from './GameDataScreen';
import PlayerDataScreen from './PlayerDataScreen';
import CharacterDataScreen from './CharacterDataScreen';
import StageDataScreen from './StageDataScreen';



function App() {
  return (
    <div className="App">
        <Router>
          <NavigationBar/>
          <br/><br/><br/><br/>
          <Route path="/Home" component={HomeScreen}/>
          <Route path="/Sets" component={SetDataScreen}/>
          <Route path="/Games" component={GameDataScreen}/>
          <Route path="/Players" component={PlayerDataScreen}/>
          <Route path="/Characters" component={CharacterDataScreen}/>
          <Route path="/Stages" component={StageDataScreen}/>
        </Router>
    </div>
  );
}

export default App;
