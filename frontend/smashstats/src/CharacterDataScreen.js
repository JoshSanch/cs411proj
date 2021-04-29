import './App.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';

class CharacterDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {char_id: "", char_name: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handleCharIDChange = this.handleCharIDChange.bind(this);
    this.handleCharNameChange = this.handleCharNameChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.updateChangeHandler = this.updateChangeHandler.bind(this);
    this.addChangeHandler = this.addChangeHandler.bind(this);
    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  handleCharIDChange(e) {
    this.setState({char_id: e.target.value})
  }

  handleCharNameChange(e) {
    this.setState({char_name: e.target.value});
  }

  stateButtonHandler(e) {
    e.preventDefault();
    this.setEmptyToNull()
    document.getElementById("p1").innerHTML = "char_id entered: " + this.state.char_id;
    document.getElementById("p2").innerHTML = "char_name entered: " + this.state.char_name;
  }

  setEmptyToNull() {
    if (this.state.char_id === "") {
      this.setState({char_id: null});
    }
    if (this.state.char_name === "") {
      this.setState({char_name: null});
    }
  }

  updateChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p4").innerHTML = "Update pressed!";
    this.setEmptyToNull();

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          char_id: this.state.char_id,
          char_name: this.state.char_name
        })
    };

    console.log(requestOptions);

    fetch('/characters/update', requestOptions)
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
    this.setEmptyToNull();

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          char_id: this.state.char_id,
          char_name: this.state.char_name
        })
    };

    console.log(requestOptions);

    fetch('/characters/create', requestOptions)
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
    this.setEmptyToNull();

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          char_id: this.state.char_id,
          char_name: this.state.char_name
        })
    };

    console.log(requestOptions);

    fetch('/characters/delete', requestOptions)
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
    this.setEmptyToNull();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          char_id: this.state.char_id,
          char_name: this.state.char_name
        })
    };

    var newTableData;
    var responseCode;
    // fetch('/characters/search', requestOptions)
    //     .then(res => res.json())
    //     .then(data => newTableData = data)
    //     .then(data => this.updateTable(newTableData, data));
    
    fetch('/characters/search', requestOptions)
        .then(function(response){
          responseCode = response.status
          return response.json()
        })
        .then(data => newTableData = data)
        .then(data => this.updateTable(newTableData, responseCode));

  }

  updateTable(newTableData, responseCode) {
    console.log("updateTable function used!");
    const newTableCols = [{
      dataField: 'char_id',
      text: 'Character ID'
    }, {
      dataField: 'char_name',
      text: 'Character Name'
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

    console.log(newTableData);
    console.log(responseCode);

    const listItem = document.getElementById("searchResultsDIV");
    const newTable = (
      <BootstrapTable id="searchResultsTable" keyField="stage_id" data={newTableData} columns={newTableCols} pagination={ paginationFactory() } />
    );
    ReactDOM.render(newTable , listItem);

  }

  render() {
    const charCols = [{
      dataField: 'char_id',
      text: 'Character ID'
    }, {
      dataField: 'char_name',
      text: 'Character Name'
    }
    ];

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
              placeholder="Character ID"
              onChange={this.handleCharIDChange}
            />
            <input
              type="text"
              value={this.state.char_name}
              placeholder="Character Name"
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
            keyField='char_id' 
            data={[]} 
            columns={charCols} 
          />
        </div>
      </div>
    );
  }
}

export default CharacterDataScreen;
