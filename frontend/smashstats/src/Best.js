import './App.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactDOM from 'react-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';

class BestInfo extends React.Component {

    constructor(props) {
        super(props);
        this.queryHandler = this.queryHandler.bind(this);
      }

    queryHandler(e) {
        e.preventDefault();
        document.getElementById("p1").innerHTML = "Query pressed!";

        var dropdown = document.getElementById("charChoice");
        var characterChosen = dropdown.value;
        console.log("Character chosen: " , characterChosen);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              characterName: characterChosen
            })
        };

        console.log(requestOptions);
        var newTableData;
        var responseCode;
        fetch('/stored_proc', requestOptions)
             .then(function(response){
                 responseCode = response.status
                 return response.json()
             })
            .then(data => newTableData = data)
            .then(data => this.updateTable(newTableData, responseCode));

        // waits for the API then sets the table as needed
        
    }

    updateTable(newTableData, responseCode) {
        const newTableCols = [{
            dataField: 'best_player_id',
            text: 'Top player ID'
        }, {
            dataField: 'best_stage',
            text: 'Best Stage (for this player)'
        }, {
            dataField: 'worst_matchup',
            text: 'Worst matchup (for this player)'
        }
        ];

        if (responseCode === 401) {
            var returnText = document.getElementById("p1")
            returnText.innerText = "Incorrect password";
            returnText.style.color = "red";
            return;
          } else if (responseCode !== 200) {
            var returnText = document.getElementById("p1")
            returnText.innerText = "An unexpected error occurred";
            returnText.style.color = "red";
            return;
          }

        const listItem = document.getElementById("searchResultsDIV");
        const newTable = (
        <BootstrapTable id="searchResultsTable" keyField="stage_id" data={newTableData} columns={newTableCols} pagination={ paginationFactory() } />
        );

        ReactDOM.render(newTable , listItem);
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
                <select id="charChoice" name="charChoice">
                    <option value="ultimate/banjokazooie">Banjo and Kazooie</option>
                    <option value="ultimate/bayonetta">Bayonetta</option>
                    <option value="ultimate/bowser">Bowser</option>
                    <option value="ultimate/bowserjr">Bowser Jr.</option>
                    <option value="ultimate/byleth">Byleth</option>
                    <option value="ultimate/captainfalcon">Captain Falcon</option>
                    <option value="ultimate/chrom">Chrom</option>
                    <option value="ultimate/cloud">Cloud</option>
                    <option value="ultimate/corrin">Corrin</option>
                    <option value="ultimate/daisy">Daisy</option>
                    <option value="ultimate/darkpit">Dark Pit</option>
                    <option value="ultimate/darksamus">Dark Samus</option>
                    <option value="ultimate/diddykong">Diddy Kong</option>
                    <option value="ultimate/donkeykong">Donkey Kong</option>
                    <option value="ultimate/drmario">Dr. Mario</option>
                    <option value="ultimate/duckhunt">Duck Hunt</option>
                    <option value="ultimate/falco">Falco</option>
                    <option value="ultimate/fox">Fox</option>
                    <option value="ultimate/ganondorf">Ganondorf</option>
                    <option value="ultimate/greninja">Greninja</option>
                    <option value="ultimate/hero">Hero</option>
                    <option value="ultimate/iceclimbers">Ice Climbers</option>
                    <option value="ultimate/ike">Ike</option>
                    <option value="ultimate/incineroar">Incineroar</option>
                    <option value="ultimate/inkling">Inkling</option>
                    <option value="ultimate/isabelle">Isabelle</option>
                    <option value="ultimate/jigglypuff">Jigglypuff</option>
                    <option value="ultimate/joker">Joker</option>
                    <option value="ultimate/ken">Ken</option>
                    <option value="ultimate/kingdedede">King Dedede</option>
                    <option value="ultimate/kingkrool">King K. Rool</option>
                    <option value="ultimate/kirby">Kirby</option>
                    <option value="ultimate/link">Link</option>
                    <option value="ultimate/littlemac">Little Mac</option>
                    <option value="ultimate/lucario">Lucario</option>
                    <option value="ultimate/lucas">Lucas</option>
                    <option value="ultimate/lucina">Lucina</option>
                    <option value="ultimate/luigi">Luigi</option>
                    <option value="ultimate/marth">Marth</option>
                    <option value="ultimate/mario">Mario</option>
                    <option value="ultimate/megaman">Megaman</option>
                    <option value="ultimate/metaknight">Meta Knight</option>
                    <option value="ultimate/mewtwo">Mewtwo</option>
                    <option value="ultimate/miibrawler">Mii Brawler</option>
                    <option value="ultimate/miigunner">Mii Gunner</option>
                    <option value="ultimate/miiswordfighter">Mii Sword Fighter</option>
                    <option value="ultimate/minmin">Min Min</option>
                    <option value="ultimate/mrgameandwatch">Mr. Game and Watch</option>
                    <option value="ultimate/ness">Ness</option>
                    <option value="ultimate/olimar">Olimar</option>
                    <option value="ultimate/pacman">Pacman</option>
                    <option value="ultimate/palutena">Palutena</option>
                    <option value="ultimate/peach">Peach</option>
                    <option value="ultimate/pichu">Pichu</option>
                    <option value="ultimate/pikachu">Pikachu</option>
                    <option value="ultimate/piranhaplant">Piranha Plant</option>
                    <option value="ultimate/pit">Pit</option>
                    <option value="ultimate/pokemontrainer">Pokemon Trainer</option>
                    <option value="ultimate/pyra">Pyra</option>
                    <option value="ultimate/random">Random</option>
                    <option value="ultimate/richter">Richter</option>
                    <option value="ultimate/ridley">Ridley</option>
                    <option value="ultimate/rob">Rob</option>
                    <option value="ultimate/robin">Robin</option>
                    <option value="ultimate/rosalina">Rosalina and Luma</option>
                    <option value="ultimate/roy">Roy</option>
                    <option value="ultimate/ryu">Ryu</option>
                    <option value="ultimate/samus">Samus</option>
                    <option value="ultimate/sephiroth">Sephiroth</option>
                    <option value="ultimate/sheik">Sheik</option>
                    <option value="ultimate/shulk">Shulk</option>
                    <option value="ultimate/simon">Simon</option>
                    <option value="ultimate/snake">Snake</option>
                    <option value="ultimate/sonic">Sonic</option>
                    <option value="ultimate/steve">Steve</option>
                    <option value="ultimate/terry">Terry</option>
                    <option value="ultimate/toonlink">Toon Link</option>
                    <option value="ultimate/villager">Villager</option>
                    <option value="ultimate/wario">Wario</option>
                    <option value="ultimate/wiifittrainer">Wii Fit Trainer</option>
                    <option value="ultimate/wolf">Wolf</option>
                    <option value="ultimate/yoshi">Yoshi</option>
                    <option value="ultimate/younglink">Young Link</option>
                    <option value="ultimate/zelda">Zelda</option>
                    <option value="ultimate/zerosuitsamus">Zero Suit Samus</option>
                </select>
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