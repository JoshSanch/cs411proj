import './App.css';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';

function HomeScreen() {
  // obtain API information
  const [topPlayerData, setTopPlayerData] = useState(0);
  useEffect(() => { //then(res => res.json()).
    fetch('/advanced/topplayers').then(res => res.json()).then(data => {
      setTopPlayerData(data.result);
    });
  }, []);

  const [stageData, setStageData] = useState(0);
  useEffect(() => { //then(res => res.json()).
    fetch('/advanced/stageusage').then(res => res.json()).then(data => {
      setStageData(data.result);
    });
  }, []);

  const [charData, setCharData] = useState(0);
  useEffect(() => { //then(res => res.json()).
    fetch('/advanced/charusage').then(res => res.json()).then(data => {
      setCharData(data.result);
    });
  }, []);

  const [charStageData, setCharStageData] = useState(0);
  useEffect(() => { //then(res => res.json()).
    fetch('/advanced/bestcharstages').then(res => res.json()).then(data => {
      setCharStageData(data.result);
    });
  }, []);

  // table info
  const topPlayerCols = [{
    dataField: 'player_id',
    text: 'Player ID'
  }, {
    dataField: 'total_games',
    text: '# of games played'
  }, {
    dataField: 'win_rate',
    text: 'Win Rate'
  }
  ]
  
  const stageCols = [{
    dataField: 'stage_name',
    text: 'Stage Name'
  }, {
    dataField: 'games_played',
    text: '# of games played'
  }
  ]

  const charCols = [{
    dataField: 'char_name',
    text: 'Character Name'
  }, {
    dataField: 'total_games',
    text: '# of games played'
  }, {
    dataField: 'win_rate',
    text: 'Win rate'
  }
  ]

  const charStageCols = [{
    dataField: 'char_name',
    text: 'Character Name'
  }, {
    dataField: 'stage_name',
    text: 'Stage name'
  }, {
    dataField: 'games_won',
    text: 'Games won'
  }
  ]
  
  function queryButton1() {
    document.getElementById("topPlayerDIV").style.display = "block";
    document.getElementById("stageDIV").style.display = "none";
    document.getElementById("charDIV").style.display = "none";
    document.getElementById("charStageDIV").style.display = "none";
  }

  function queryButton2() {
    document.getElementById("topPlayerDIV").style.display = "none";
    document.getElementById("stageDIV").style.display = "block";
    document.getElementById("charDIV").style.display = "none";
    document.getElementById("charStageDIV").style.display = "none";
  }

  function queryButton3() {
    document.getElementById("topPlayerDIV").style.display = "none";
    document.getElementById("stageDIV").style.display = "none";
    document.getElementById("charDIV").style.display = "block";
    document.getElementById("charStageDIV").style.display = "none";
  }

  function queryButton4() {
    document.getElementById("topPlayerDIV").style.display = "none";
    document.getElementById("stageDIV").style.display = "none";
    document.getElementById("charDIV").style.display = "none";
    document.getElementById("charStageDIV").style.display = "block";
  }

  return (
    <div>
        <p>Hello! </p>
        <p></p>
        <p>This is the home screen</p>
        {/* <div><pre>{JSON.stringify(topTemp, null, 2) }</pre></div> */}
        <div id="queryButtons">
          <button onClick={queryButton1} >This button shows the first query</button>
          <button onClick={queryButton2} >This button shows the second query</button>
          <button onClick={queryButton3} >This button shows the third query</button>
          <button onClick={queryButton4} >This button shows the fourth query</button>
        </div>
        <div id="topPlayerDIV" style={{display: "none"}}>
          <p>Data on top players, the number of games played, and win rate:</p>
          <BootstrapTable keyField='player_id' data={topPlayerData} columns={ topPlayerCols } pagination={ paginationFactory() }/>
        </div>
        <div id="stageDIV" style={{display: "none"}}>
          <p>Data on stages and the number of games played on each stage</p>
          <BootstrapTable keyField='stage_name' data={stageData} columns={ stageCols } pagination={ paginationFactory() }/>
        </div>
        <div id="charDIV" style={{display: "none"}}>
          <p>Data on characters, number of games where the character is played, and their win rates</p>
          <BootstrapTable keyField='char_name' data={charData} columns={ charCols } pagination={ paginationFactory() }/>
        </div>
        <div id="charStageDIV" style={{display: "none"}}>
          <p>Data on characters, stages, and the number of games each character has won on each stage</p>
          <BootstrapTable keyField='id3' data={charStageData} columns={ charStageCols} pagination={ paginationFactory() }/>
        </div>
    </div>
  );
}

export default HomeScreen;
