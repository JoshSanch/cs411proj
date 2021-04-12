import './App.css';
import React from 'react';

class StageDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {stage_id: "", stage_name: ""};
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
    this.handleStageIDChange = this.handleStageIDChange.bind(this);
    this.handleStageNameChange = this.handleStageNameChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.setEmptyToNull = this.setEmptyToNull.bind(this);
  }

  useEffect() {
    // Simple POST request with a JSON body using fetch. NEEDS TO BE WORKED ON

    this.setEmptyToNull()

    console.log(this.state);

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       stage_id: this.state.stage_id,
    //       stage_name: this.state.stage_name
    //     })
    // };


    // fetch('/stages/create', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));
  }

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
          stage_id: this.state.stage_id,
          stage_name: this.state.stage_name
        })
    };

    fetch('/stages/search', requestOptions);
  }

  render () {
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
    </div>
    );
  }
}

export default StageDataScreen;
