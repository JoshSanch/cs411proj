import './App.css';
import React from 'react';

class CharacterDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {char_id: "", char_name: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handleCharIDChange = this.handleCharIDChange.bind(this);
    this.handleCharNameChange = this.handleCharNameChange.bind(this);
  }
  
  handleCharIDChange(e) {
    this.setState({char_id: e.target.value})
  }

  handleCharNameChange(e) {
    this.setState({char_name: e.target.value});
  }

  stateButtonHandler(e) {
    e.preventDefault();
    document.getElementById("p1").innerHTML = "char_id entered: " + this.state.char_id;
    document.getElementById("p2").innerHTML = "char_name entered: " + this.state.char_name;
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

  render() {
      return (
      <div>
        <p>Hello! </p>
        <p></p>
        <div id="div1">
          <p>This is the character data screen</p>
        </div>
        <div id="getRowDIV">
          <form>
            <p>Set the Character ID and name below:</p>
            <input
              type="text"
              value={this.state.char_id}
              onChange={this.handleCharIDChange}
            />
            <input 
              type="text"
              value={this.state.char_name}
              onChange={this.handleCharNameChange}
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

export default CharacterDataScreen;