import './App.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';

class BestInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {char_name: ""};
        this.queryHandler = this.queryHandler.bind(this);
      }

    queryHandler(e) {
        e.preventDefault();
        document.getElementById("p1").innerHTML = "Query pressed!";

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              char_name: this.state.char_name
            })
        };

        console.log(this.state);
        // var newTableData;
        // fetch('', requestOptions)
        //     .then(res => res.json())
        //     .then(data => newTableData = data)

        // waits for the API then sets the table as needed
        // setTimeout(() => {
        //     console.log(newTableData);
        //     const newTableCols = [{
        //         dataField: 'best_player_id',
        //         text: 'Top player ID'
        //     }, {
        //         dataField: 'best_stage',
        //         text: 'Best Stage (for this player)'
        //     }, {
        //         dataField: 'worst_matchup',
        //         text: 'Worst matchup (for player)'
        //     }
        //     ];
        //     const listItem = document.getElementById("searchResultsDIV");
        //     const newTable = (
        //     <BootstrapTable id="searchResultsTable" keyField="stage_id" data={newTableData} columns={newTableCols} pagination={ paginationFactory() } />
        //     )
    
        //     ReactDOM.render(newTable , listItem)
    
        // }, 2000);
    }

    render() {

        const charCols = [{
            dataField: 'best_player_id',
            text: 'Top player ID'
          }, {
            dataField: 'best_stage',
            text: 'Best Stage (for this player)'
          }, {
            dataField: 'worst_matchup',
            text: 'Worst matchup (for player)'
          }
          ];

        return (
        <div>
            <p>Hello! </p>
            <p></p>
            <div id="div1">
                <p>This is the advanced top player information screen. </p>
            </div>
            <div id="getRowDIV">
                <form>
                <p>Set a character from the dropdown menu below:</p>
                <input
                    type="text"
                    value={this.state.char_name}
                    placeholder="Character Name"
                    onChange={this.handleCharNameChange}
                />
                <button type="submit" onClick={this.queryHandler}>Submit</button>
                </form>
                <p id="p1"></p>
                <p id="p2"></p>
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

export default BestInfo;