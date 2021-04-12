import './App.css';
import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'

class StageDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {stage_id: "", stage_name: ""};
    this.query_state = null;
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handleStageIDChange = this.handleStageIDChange.bind(this);
    this.handleStageNameChange = this.handleStageNameChange.bind(this);
    this.updateChangeHandler = this.updateChangeHandler.bind(this);
    this.addChangeHandler = this.addChangeHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  // static stageData; 
  // static setStageData;


  setEmptyToNull() {
    if (this.state.stage_id === "") {
      this.setState({stage_id: null});
    }
    if (this.state.stage_name === "") {
      this.setState({stage_name: null});
    }
  }

  handleStageIDChange(e) {
    this.setState({stage_id: e.target.value})
  }

  handleStageNameChange(e) {
    this.setState({stage_name: e.target.value});
  }

  stateButtonHandler(e) {
    e.preventDefault();
    this.setEmptyToNull()
    document.getElementById("p1").innerHTML = "stage_id entered: " + this.state.stage_id;
    document.getElementById("p2").innerHTML = "stage_name entered: " + this.state.stage_name;
  }

  updateChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p4").innerHTML = "Update pressed!"

    this.setEmptyToNull();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage_id: this.state.stage_id,
        stage_name: this.state.stage_name
      })
    }

    fetch('/stages/update', requestOptions);
  }

  addChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p6").innerHTML = "Create pressed!";

    this.setEmptyToNull();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage_id: this.state.stage_id,
        stage_name: this.state.stage_name
      })
    }

    fetch('/stages/create', requestOptions);
  }

  deleteChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p8").innerHTML = "Delete pressed!";

    this.setEmptyToNull();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage_id: this.state.stage_id,
        stage_name: this.state.stage_name
      })
    }

    fetch('/stages/delete', requestOptions);
  }

  searchChangeHandler(e) {
    e.preventDefault();
    document.getElementById("p10").innerHTML = "Search pressed!";
    this.setEmptyToNull()

    // console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage_id: this.state.stage_id,
          stage_name: this.state.stage_name
        })
    };

    var newTableData;
    fetch('/stages/search', requestOptions)
        .then(res => res.json())
        .then(data => newTableData = data);

    // waits for the API then sets the table as needed
    setTimeout(() => {
      const newTableCols = [{
        dataField: 'stage_id',
        text: 'Stage Id'
      }, {
        dataField: 'stage_name',
        text: 'Stage Name'
      }
      ];
      const listItem = document.getElementById("searchResultsDIV");
      const newTable = (
        <BootstrapTable id="searchResultsTable" keyField="stage_id" data={newTableData} columns={newTableCols} />
      )

      ReactDOM.render(newTable , listItem)

    }, 2000);

  }

  render () {
    const stageCols = [{
      dataField: 'stage_id',
      text: 'Stage Id'
    }, {
      dataField: 'stage_name',
      text: 'Stage Name'
    }
    ];

    return (
    <div>
        <p>Hello! </p>
        <p></p>
        <div id="div1">
          <p>This is the stage data screen</p>
        </div>
        <div id="getRowDIV">
          <form>
            <p>Set the Stage ID and name below:</p>
            <input
              type="text"
              value={this.state.stage_id}
              placeholder="Stage ID"
              onChange={this.handleStageIDChange}
            />
            <input
              type="text"
              placeholder="Stage Name"
              value={this.state.stage_name}
              onChange={this.handleStageNameChange}
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
            columns={stageCols} 
          />
        </div>
    </div>
    );
  }
}

export default StageDataScreen;
