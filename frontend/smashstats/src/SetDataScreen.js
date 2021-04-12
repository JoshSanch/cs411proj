import './App.css';
import React from 'react';

class PlayerDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { set_id: "", winner_id: "", loser_id: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.handleSetIDChange = this.handleSetIDChange.bind(this);
    this.handleWinnerIDChange = this.handleWinnerIDChange.bind(this);
    this.handleLoserIDChange = this.handleLoserIDChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  handleSetIDChange(e) {
    this.setState({set_id: e.target.value})
  }

  handleWinnerIDChange(e) {
    this.setState({winner_id: e.target.value});
  }

  handleLoserIDChange(e) {
    this.setState({loser_id: e.target.value});
  }

  setEmptyToNull() {
    if (this.state.set_id === "") {
      this.setState({set_id: null});
    }
    if (this.state.winner_id === "") {
      this.setState({winner_id: null});
    }
    if (this.state.loser_id === "") {
      this.setState({loser_id: null});
    }
  }

  stateButtonHandler(e) {
    e.preventDefault();
    this.setEmptyToNull()
    document.getElementById("p1").innerHTML = "set_id entered: " + this.state.set_id;
    document.getElementById("p2").innerHTML = "winner_id entered: " + this.state.winner_id;
    document.getElementById("pp2").innerHTML = "loser_id entered: " + this.state.loser_id;
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

  searchChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p10").innerHTML = "Search pressed!";
    this.setEmptyToNull()

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          set_id: this.state.set_id,
          winner_id: this.state.winner_id,
          loser_id: this.state.loser_id
        })
    };
    
    fetch('/sets/search', requestOptions);
  }

  render () {
    return (
      <div>
        <p>Hello! </p>
        <p></p>
        <div id="div1">
          <p>This is the set data screen</p>
        </div>
        <div id="getRowDIV">
          <form>
            <p>Set the Set ID, winner ID, and loser ID below:</p>
            <input
              type="text"
              value={this.state.set_id}
              onChange={this.handleSetIDChange}
              placeholder="set_id"
            />
            <input 
              type="text"
              value={this.state.winner_id}
              onChange={this.handleWinnerIDChange}
              placeholder="winner_id"
            />
            <input 
              type="text"
              value={this.state.loser_id}
              onChange={this.handleLoserIDChange}
              placeholder="loser_id"
            />
            <button type="submit" onClick={this.stateButtonHandler}>Press here</button>
          </form>
          <p id="p1"></p>
          <p id="p2"></p>
          <p id="pp2"></p>
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
        <div id="searchDIV">
          <p id="p9">Press this button search for data:</p>
          <button onClick={this.searchChangeHandler}>Search</button>
          <p id="p10"></p>
        </div>
      </div>
    );
  }
  
}

export default PlayerDataScreen;