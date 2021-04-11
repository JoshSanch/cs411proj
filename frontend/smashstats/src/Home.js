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
    text: 'ID'
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
    text: 'Player ID'
  }, {
    dataField: 'stage_name',
    text: 'Stage name'
  }, {
    dataField: 'games_won',
    text: 'Games won'
  }
  ]
  
  function queryButton1() {
    var x = document.getElementById("topPlayerDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    return;
  }

  return (
    <div>
        <p>Hello! </p>
        <p></p>
        <p>This is the home screen</p>
        {/* <div><pre>{JSON.stringify(topTemp, null, 2) }</pre></div> */}
        <div id="queryButtons">
          <button onclick={queryButton1} id="query1">This button is useless for now</button>
        </div>
        <div id="topPlayerDIV">
          <p>Data on top players, the number of games played, and win rate:</p>
          <BootstrapTable keyField='id1' data={topPlayerData} columns={ topPlayerCols } pagination={ paginationFactory() }/>
        </div>
        <div id="stageDIV">
          <p>Data on stages and the number of games played on each stage</p>
          <BootstrapTable keyField='id2' data={stageData} columns={ stageCols } pagination={ paginationFactory() }/>
        </div>
        <div id="charDIV">
          <p>Data on characters, number of games where the character is played, and their win rates</p>
          <BootstrapTable keyField='id2' data={charData} columns={ charCols } pagination={ paginationFactory() }/>
        </div>
        <div id="charStageDIV">
          <p>Data on characters, stages, and the number of games each character has won on each stage</p>
          <BootstrapTable keyField='id3' data={charStageData} columns={ charStageCols} pagination={ paginationFactory() }/>
        </div>
    </div>
  );
}

export default HomeScreen;
