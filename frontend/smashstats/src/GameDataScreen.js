import './App.css';
import React from 'react';

class GameDataScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      game_id: "", 
      winner_id: "", 
      loser_id: "", 
      winner_score: "",
      loser_score: "",
      winner_char_id: "",
      loser_char_id: "",
      stage_id: "",
      set_id: ""
    };
    this.stateButtonHandler = this.stateButtonHandler.bind(this);
    
    this.handleGameIDChange = this.handleGameIDChange.bind(this);
    this.handleWinnerIDChange = this.handleWinnerIDChange.bind(this);
    this.handleLoserIDChange = this.handleLoserIDChange.bind(this);
    this.handleWinnerScoreChange = this.handleWinnerScoreChange.bind(this);
    this.handleLoserScoreChange = this.handleLoserScoreChange.bind(this);
    this.handleWinnerCharIDChange = this.handleWinnerCharIDChange.bind(this);
    this.handleLoserCharIDChange = this.handleLoserCharIDChange.bind(this);
    this.handleStageIDChange = this.handleStageIDChange.bind(this);
    this.handleSetIDChange = this.handleSetIDChange.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }

  stateButtonHandler(e) {
    e.preventDefault();
    if (this.state.game_id === "") {
      this.setState({game_id: null});
    }
    if (this.state.winner_id === "") {
      this.setState({winner_id: null});
    }
    if (this.state.loser_id === "") {
      this.setState({loser_id: null});
    }
    if (this.state.winner_score === "") {
      this.setState({winner_score: null});
    }
    if (this.state.loser_score === "") {
      this.setState({loser_score: null});
    }
    if (this.state.winner_char_id === "") {
      this.setState({winner_char_id: null});
    }
    if (this.state.loser_char_id === "") {
      this.setState({loser_char_id: null});
    }
    if (this.state.stage_id === "") {
      this.setState({stage_id: null});
    }
    if (this.state.set_id === "") {
      this.setState({set_id: null});
    }
    document.getElementById("p1").innerHTML = "game_id entered: " + this.state.game_id;
    document.getElementById("p2").innerHTML = "winner_id entered: " + this.state.winner_id;
    document.getElementById("pp1").innerHTML = "loser_id entered: " + this.state.loser_id;
    document.getElementById("pp2").innerHTML = "winner_score entered: " + this.state.winner_score;
    document.getElementById("pp3").innerHTML = "loser_score entered: " + this.state.loser_score;
    document.getElementById("pp4").innerHTML = "winner_char_id entered: " + this.state.winner_char_id;
    document.getElementById("pp5").innerHTML = "loser_char_id entered: " + this.state.loser_char_id;
    document.getElementById("pp6").innerHTML = "stage_id entered: " + this.state.stage_id;
    document.getElementById("pp7").innerHTML = "set_id entered: " + this.state.set_id;
  }

  handleGameIDChange(e) {
    this.setState({game_id: e.target.value})
  }

  handleWinnerIDChange(e) {
    this.setState({winner_id: e.target.value});
  }

  handleLoserIDChange(e) {
    this.setState({loser_id: e.target.value});
  }

  handleWinnerScoreChange(e) {
    this.setState({winner_score: e.target.value})
  }

  handleLoserScoreChange(e) {
    this.setState({loser_score: e.target.value})
  }

  handleWinnerCharIDChange(e) {
    this.setState({winner_char_id: e.target.value});
  }

  handleLoserCharIDChange(e) {
    this.setState({loser_char_id: e.target.value});
  }

  handleStageIDChange(e) {
    this.setState({stage_id: e.target.value})
  }

  handleSetIDChange(e) {
    this.setState({set_id: e.target.value});
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

    if (this.state.game_id === "") {
      this.setState({game_id: null});
    }
    if (this.state.winner_id === "") {
      this.setState({winner_id: null});
    }
    if (this.state.loser_id === "") {
      this.setState({loser_id: null});
    }
    if (this.state.winner_score === "") {
      this.setState({winner_score: null});
    }
    if (this.state.loser_score === "") {
      this.setState({loser_score: null});
    }
    if (this.state.winner_char_id === "") {
      this.setState({winner_char_id: null});
    }
    if (this.state.loser_char_id === "") {
      this.setState({loser_char_id: null});
    }
    if (this.state.stage_id === "") {
      this.setState({stage_id: null});
    }
    if (this.state.set_id === "") {
      this.setState({set_id: null});
    }

    console.log(this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          game_id: this.state.game_id, 
          winner_id: this.state.winner_id, 
          loser_id: this.state.loser_id, 
          winner_score: this.state.winner_score,
          loser_score: this.state.loser_score,
          winner_char_id: this.state.winner_char_id,
          loser_char_id: this.state.loser_char_id,
          stage_id: this.state.stage_id,
          set_id: this.state.set_id
        })
    };
    
    fetch('/games/search', requestOptions);
  }

  
  render () {
    return (
    <div>
        <p>Hello! </p>
        <p></p>
        <div id="div1">
          <p>This is the game data screen</p>
        </div>
        <div id="getRowDIV">
          <form>
            <p>Set the game_id, winner_id, loser_id, winner_score, loser_score, winner_char_id, loser_char_id, stage_id, and set_id below:</p>
            <input
              type="text"
              value={this.state.game_id}
              onChange={this.handleGameIDChange}
              placeholder="game_id"
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
            <input 
              type="text"
              value={this.state.winner_score}
              onChange={this.handleWinnerScoreChange}
              placeholder="winner_score"
            />
            <input 
              type="text"
              value={this.state.loser_score}
              onChange={this.handleLoserScoreChange}
              placeholder="loser_score"
            />
            <input 
              type="text"
              value={this.state.winner_char_id}
              onChange={this.handleWinnerCharIDChange}
              placeholder="winner_char_id"
            />
            <input 
              type="text"
              value={this.state.loser_char_id}
              onChange={this.handleLoserCharIDChange}
              placeholder="loser_char_id"
            />
            <input 
              type="text"
              value={this.state.stage_id}
              onChange={this.handleStageIDChange}
              placeholder="stage_id"
            />
            <input 
              type="text"
              value={this.state.set_id}
              onChange={this.handleSetIDChange}
              placeholder="set_id"
            />
            <button type="submit" onClick={this.stateButtonHandler}>Press here</button>
          </form>
          <p id="p1"></p>
          <p id="p2"></p>
          <p id="pp1"></p>
          <p id="pp2"></p>
          <p id="pp3"></p>
          <p id="pp4"></p>
          <p id="pp5"></p>
          <p id="pp6"></p>
          <p id="pp7"></p>
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

export default GameDataScreen;