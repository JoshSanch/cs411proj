import './App.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';

class PlayerDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { set_id: "", set_winner_id: "", set_loser_id: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.handleSetIDChange = this.handleSetIDChange.bind(this);
    this.handleWinnerIDChange = this.handleWinnerIDChange.bind(this);
    this.handleLoserIDChange = this.handleLoserIDChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.addChangeHandler = this.addChangeHandler.bind(this);
    this.updateChangeHandler = this.updateChangeHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);

    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  handleSetIDChange(e) {
    this.setState({set_id: e.target.value})
  }

  handleWinnerIDChange(e) {
    this.setState({set_winner_id: e.target.value});
  }

  handleLoserIDChange(e) {
    this.setState({set_loser_id: e.target.value});
  }

  setEmptyToNull() {
    if (this.state.set_id === "") {
      this.setState({set_id: null});
    }
    if (this.state.set_winner_id === "") {
      this.setState({set_winner_id: null});
    }
    if (this.state.set_loser_id === "") {
      this.setState({set_loser_id: null});
    }
  }

  stateButtonHandler(e) {
    e.preventDefault();
    this.setEmptyToNull()
    document.getElementById("p1").innerHTML = "set_id entered: " + this.state.set_id;
    document.getElementById("p2").innerHTML = "set_winner_id entered: " + this.state.set_winner_id;
    document.getElementById("pp2").innerHTML = "set_loser_id entered: " + this.state.set_loser_id;
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
          set_id: this.state.set_id,
          set_winner_id: this.state.set_winner_id,
          set_loser_id: this.state.set_loser_id
        })
    };

    fetch('/sets/update', requestOptions);
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
          set_id: this.state.set_id,
          set_winner_id: this.state.set_winner_id,
          set_loser_id: this.state.set_loser_id
        })
    };

    fetch('/sets/create', requestOptions);
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
          set_id: this.state.set_id,
          set_winner_id: this.state.set_winner_id,
          set_loser_id: this.state.set_loser_id
        })
    };

    fetch('/sets/delete', requestOptions);
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
          set_winner_id: this.state.set_winner_id,
          set_loser_id: this.state.set_loser_id
        })
    };

    var newTableData;
    fetch('/sets/search', requestOptions)
        .then(res => res.json())
        .then(data => newTableData = data);

    // waits for the API then sets the table as needed
    setTimeout(() => {
      console.log(newTableData);
      const newTableCols = [{
        dataField: 'set_id',
        text: 'Set ID'
      }, {
        dataField: 'set_winner_id',
        text: 'Winner ID'
      }, {
        dataField: 'set_loser_id',
        text: 'Loser ID'
      }
      ];
      const listItem = document.getElementById("searchResultsDIV");
      const newTable = (
        <BootstrapTable id="searchResultsTable" keyField="stage_id" data={newTableData} columns={newTableCols} pagination={ paginationFactory() } />
      )

      ReactDOM.render(newTable , listItem)

    }, 5000);
  }

  render () {

    const setCols = [{
      dataField: 'set_id',
      text: 'Set ID'
    }, {
      dataField: 'set_winner_id',
      text: 'Winner ID'
    }, {
      dataField: 'set_loser_id',
      text: 'Loser ID'
    }
    ];
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
              value={this.state.set_winner_id}
              onChange={this.handleWinnerIDChange}
              placeholder="set_winner_id"
            />
            <input
              type="text"
              value={this.state.set_loser_id}
              onChange={this.handleLoserIDChange}
              placeholder="set_loser_id"
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
            columns={setCols}
          />
        </div>
      </div>
    );
  }

}

export default PlayerDataScreen;
