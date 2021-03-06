import './App.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';

class PlayerDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {player_id: "", player_name: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handlePlayerIDChange = this.handlePlayerIDChange.bind(this);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.addChangeHandler = this.addChangeHandler.bind(this);
    this.updateChangeHandler = this.updateChangeHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  handlePlayerIDChange(e) {
    this.setState({player_id: e.target.value})
  }

  handlePlayerNameChange(e) {
    this.setState({player_name: e.target.value});
  }

  stateButtonHandler(e) {
    e.preventDefault();
    this.setEmptyToNull()
    document.getElementById("p1").innerHTML = "player_id entered: " + this.state.player_id;
    document.getElementById("p2").innerHTML = "player_name entered: " + this.state.player_name;
  }

  setEmptyToNull() {
    if (this.state.player_id === "") {
      this.setState({player_id: null});
    }
    if (this.state.player_name === "") {
      this.setState({player_name: null});
    }
  }

  updateChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p4").innerHTML = "Update pressed!"
    this.setEmptyToNull()

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: this.state.player_id,
          player_name: this.state.player_name,
          password: document.getElementById("pwbox").value
        })
    };

    fetch('/players/update', requestOptions)
    .then(function(response) {
      var textData = document.getElementById("p4");
      switch (response.status) {
        case (200):
          textData.innerHTML = "Update performed successfully!";
          break;
        case (401):
          textData.innerHTML = "Incorrect Password";
          textData.style.color = "red";
          break;
        default:
          textData.innerHTML = "An unexpected error occurred"
          textData.style.color = "red";
      }
    })
  }

  addChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p6").innerHTML = "Create pressed!";
    this.setEmptyToNull()

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: this.state.player_id,
          player_name: this.state.player_name,
          password: document.getElementById("pwbox").value
        })
    };

    fetch('/players/create', requestOptions)
    .then(function(response) {
      var textData = document.getElementById("p6");
      switch (response.status) {
        case (200):
          textData.innerHTML = "Add performed successfully!";
          break;
        case (401):
          textData.innerHTML = "Incorrect Password";
          textData.style.color = "red";
          break;
        default:
          textData.innerHTML = "An unexpected error occurred"
          textData.style.color = "red";
      }
    })
  }

  deleteChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p8").innerHTML = "Delete pressed!";
    this.setEmptyToNull()

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: this.state.player_id,
          player_name: this.state.player_name,
          password: document.getElementById("pwbox").value
        })
    };

    fetch('/players/delete', requestOptions)
    .then(function(response) {
      var textData = document.getElementById("p8");
      switch (response.status) {
        case (200):
          textData.innerHTML = "Delete performed successfully!";
          break;
        case (401):
          textData.innerHTML = "Incorrect Password";
          textData.style.color = "red";
          break;
        default:
          textData.innerHTML = "An unexpected error occurred"
          textData.style.color = "red";
      }
    })
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
          player_id: this.state.player_id,
          player_name: this.state.player_name,
          password: document.getElementById("pwbox").value
        })
    };

    var newTableData;
    var responseCode;
    fetch('/players/search', requestOptions)
        .then(function(response){
          responseCode = response.status
          return response.json()
        })
        .then(data => newTableData = data)
        .then(data => this.updateTable(newTableData, responseCode));

  }

  updateTable(newTableData, responseCode) {
    const newTableCols = [{
      dataField: 'player_id',
      text: 'Player ID'
    }, {
      dataField: 'player_name',
      text: 'Player Name'
    }
    ];

    if (responseCode === 401) {
      var returnText = document.getElementById("p10")
      returnText.innerText = "Incorrect password";
      returnText.style.color = "red";
      return;
    } else if (responseCode !== 200) {
      var returnText = document.getElementById("p10")
      returnText.innerText = "An unexpected error occurred";
      returnText.style.color = "red";
      return;
    }

    const listItem = document.getElementById("searchResultsDIV");
    const newTable = (
      <BootstrapTable id="searchResultsTable" keyField="player_id" data={newTableData} columns={newTableCols} pagination={ paginationFactory() } />
    )

    console.log(newTableData);
    ReactDOM.render(newTable , listItem)
  }

  render () {
    const tableCols = [{
      dataField: 'player_id',
      text: 'Player ID'
    }, {
      dataField: 'player_name',
      text: 'Player Name'
    }
    ];

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
              placeholder="Player ID"
              value={this.state.player_id}
              onChange={this.handlePlayerIDChange}
            />
            <input
              type="text"
              placeholder="Player Name"
              value={this.state.player_name}
              onChange={this.handlePlayerNameChange}
            />
            <button type="submit" onClick={this.stateButtonHandler}>Press here</button>
          </form>
          <p id="p1"></p>
          <p id="p2"></p>
        </div>
        <div>
          <p>Set a password for updating, creating, and deleting from the database here:</p>
          <form>
            <input
              type="password"
              placeholder="Password"
              id="pwbox"
            />
          </form>
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
          <button onClick={this.deleteChangeHandler}>Delete</button>
          <p id="p8"></p>
        </div>
        <div id="searchDIV">
          <p id="p9">Press this button search for data:</p>
          <button onClick={this.searchChangeHandler}>Search</button>
          <p id="p10"></p>
        </div>
        <div id="searchResultsDIV">
          <BootstrapTable
            id="searchResultsTable"
            keyField='stage_id'
            data={[]}
            columns={tableCols}
          />
        </div>
      </div>
    );
  }

}

export default PlayerDataScreen;
