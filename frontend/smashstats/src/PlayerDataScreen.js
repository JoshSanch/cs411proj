import './App.css';
import React from 'react';

class PlayerDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {player_id: "", player_name: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handlePlayerIDChange = this.handlePlayerIDChange.bind(this);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
  }

  handlePlayerIDChange(e) {
    this.setState({player_id: e.target.value})
  }

  handlePlayerNameChange(e) {
    this.setState({player_name: e.target.value});
  }

  stateButtonHandler(e) {
    e.preventDefault();
    document.getElementById("p1").innerHTML = "player_id entered: " + this.state.player_id;
    document.getElementById("p2").innerHTML = "player_name entered: " + this.state.player_name;
  }

  updateChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p4").innerHTML = "Update pressed!"
  }

  addChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p6").innerHTML = "Create pressed!";
  }

  deleteChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p8").innerHTML = "Delete pressed!";
  }

  render () {
    return (
      <div>
        <p>Hello! </p>
        <p></p>
        <div id="div1">
          <p>This is the player data screen</p>
        </div>
        <div id="getRowDIV">
          <form>
            <p>Set the Player ID and name below:</p>
            <input
              type="text"
              value={this.state.player_id}
              onChange={this.handlePlayerIDChange}
            />
            <input 
              type="text"
              value={this.state.player_name}
              onChange={this.handlePlayerNameChange}
            />
            <button type="submit" onClick={this.stateButtonHandler}>Press here</button>
          </form>
          <p id="p1"></p>
          <p id="p2"></p>
        </div>
        <div id="updateDIV">
          <p id="p3">Press this button to update the corresponding stage ID in the database:</p>
          <button onClick={this.updateChangeHandler}>Update</button>
          <p id="p4"></p>
        </div>
        <div id="addDIV">
          <p id="p5">Press this button to add the corresponding stage ID and name to the database:</p>
          <button onClick={this.addChangeHandler}>Create</button>
          <p id="p6"></p>
        </div>
        <div id="deleteDIV">
          <p id="p7">Press this button to delete the corresponding stage ID from the database:</p>
          <button onClick={this.deleteChangeHandler}>Add</button>
          <p id="p8"></p>
        </div>
      </div>  
    );
  }
  
}

export default PlayerDataScreen;