from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import time
import config

app = Flask(__name__)
app.config.from_object("config.Config")

db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    # Test that root routing is returning data correctly
    headers = {"Content-Type": "application/json"}
    return make_response(
        'Hi there',
        200,
    )


@app.route('/toplayers')
def check_val():
    qprep = {"topplayers": 'SELECT player_id, games_won + games_lost as total_games, games_won /                    (games_won + games_lost) as win_rate\
                        FROM ( SELECT player_id, count(game_id) as games_won\
                        FROM Players JOIN Games ON Players.player_id = Games.winner_id\
                        GROUP BY player_id ORDER BY games_won DESC ) AS t1\
                        NATURAL JOIN\
                        (\
                        SELECT player_id , count(game_id) as games_lost\
                        FROM Players JOIN Games ON Players.player_id = Games.loser_id\
                        GROUP BY player_id\
                        ORDER BY games_lost DESC\
                        ) as t2\
                        WHERE games_won + games_lost > 50\
                        ORDER BY win_rate DESC\
                        LIMIT 50;'}
    query_str = qprep["topplayers"]
    if (0):
        return jsonify({'result': query_str})
    result = db.engine.execute(query_str)
    return jsonify({'result': [dict(row) for row in result]})
    


@app.route('/advanced/<query_name>', methods=["GET"])
def exec_advanced_query(query_name):
    query_to_prep = {
        "topplayers": 'SELECT player_id, games_won + games_lost as total_games, games_won / (games_won + games_lost) as win_rate\
                        FROM ( SELECT player_id, count(game_id) as games_won\
                        FROM Players JOIN Games ON Players.player_id = Games.winner_id\
                        GROUP BY player_id ORDER BY games_won DESC ) AS t1\
                        NATURAL JOIN\
                        (\
                        SELECT player_id , count(game_id) as games_lost\
                        FROM Players JOIN Games ON Players.player_id = Games.loser_id\
                        GROUP BY player_id\
                        ORDER BY games_lost DESC\
                        ) as t2\
                        WHERE games_won + games_lost > 50\
                        ORDER BY win_rate DESC\
                        LIMIT 50;',
        "stageusage": 'SELECT stage_name, COUNT(game_id) as games_played FROM Stages NATURAL JOIN Games GROUP BY stage_name ORDER BY games_played DESC;',
        "charusage": 'SELECT char_name, games_won + games_lost AS total_games, games_won / (games_won + games_lost) AS win_rate FROM ( SELECT char_name, count(game_id) as games_won FROM Games JOIN Characters ON Games.winner_char_id = Characters.char_id GROUP BY char_name ORDER BY games_won DESC ) AS t1 NATURAL JOIN ( SELECT char_name, count(game_id) as games_lost FROM Games JOIN Characters ON Games.loser_char_id = Characters.char_id GROUP BY char_name ORDER BY games_lost DESC) AS t2 ORDER BY win_rate DESC',
        "bestcharstages": 'SELECT char_name, stage_name, count(game_id) as games_won FROM Stages NATURAL JOIN Games JOIN Characters ON Games.winner_char_id = Characters.char_id WHERE stage_name <> "" GROUP BY stage_name, char_name HAVING games_won > 3 ORDER BY char_name, games_won DESC'
    }

    query_str = query_to_prep[query_name]
    result = db.engine.execute(query_str)
    return jsonify({'result': [dict(row) for row in result]})
        
