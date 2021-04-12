from flask import Flask, make_response, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

from models import *

import time
import config
import json

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
        
@app.route('/<table_slug>/<operation>', methods=['GET','POST'])
def crud_handler(table_slug, operation): 
    #table_slug is for table, operation for CRUD
    if operation == 'create':
        if table_slug == 'players':
            try:
                player = Players(player_id=request.form.get('player_id'), player_name=request.form.get('player_name'))
                db.session.add(player)
                db.session.commit()
                return make_response(jsonify(message="Player successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting player'), 500)

        if table_slug == 'stages':
            try:
                stage = Stages(stage_id=request.form.get('stage_id'), stage_name=request.form.get('stage_name'))
                db.session.add(stage)
                db.session.commit()
                return make_response(jsonify(message="Stage successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting stage'), 500)

        if table_slug == 'games':
            try:
                game = Games(
                    game_id=request.form.get('game_id'), 
                    winner_id=request.form.get('winner_id'), 
                    loser_id=request.form.get('loser_id'), 
                    winner_score=request.form.get('winner_score'),
                    loser_score=request.form.get('loser_score'), 
                    winner_char_id=request.form.get('winner_char_id'), 
                    loser_char_id=request.form.get('loser_char_id'), 
                    stage_id=request.form.get('stage_id'),
                    set_id=request.form.get('set_id')
                    )
                db.session.add(game)
                db.session.commit()
                return make_response(jsonify(message="Game successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting game'), 500)


        if table_slug == 'sets':
            try:
                sets = Sets(set_id=request.form.get('set_id'), set_winner_id=request.form.get('set_winner_id'), set_loser_id=request.form.get('set_loser_id'))
                db.session.add(sets)
                db.session.commit()
                return make_response(jsonify(message="Set successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting set'), 500)


        if table_slug == 'characters':
            try:
                character = Characters(char_id=request.form.get('char_id'), char_name=request.form.get('char_name'))
                db.session.add(character)
                db.session.commit()
                return make_response(jsonify(message="Character successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting character'), 500)
        
        return make_response(jsonify(message='Invalid Table'), 500)


    elif operation == 'search':
        query_data = json.loads(request.data)
        query_data = {k: v for k, v in query_data.items() if v is not None}

        class_map = {
            "players": Players,
            "stages": Stages,
            "characters": Characters,
            "sets": Sets,
            "games": Games
        }

        try:
            query_data = [getattr(class_map[table_slug], k).ilike(f"%{v}%") for k, v in query_data.items()]
            result = Stages.query.filter(*query_data).all()
            result = [i.to_dict() for i in result]
            return make_response(jsonify(result), 200)
        except Exception as ex:
            print(repr(ex))
            return make_response(jsonify(message=f'Error searching on {table_slug}'), 500)


    elif operation == 'update':
        if table_slug == 'players':
            try:
                player = Players(player_id=request.form.get('player_id'), player_name=request.form.get('player_name'))
                db.session.add(player)
                db.session.commit()
                return make_response('Successfully inserted player', 50)
            except:
                return make_response('Error inserting player', 50)

    elif operation == 'delete':
        if table_slug == 'players':
            try:
                player = Players(player_id=request.form.get('player_id'), player_name=request.form.get('player_name'))
                db.session.add(player)
                db.session.commit()
                return make_response('Successfully inserted player', 50)
            except:
                return make_response('Error inserting player', 50)

    return make_response(
        "I'm slugging!",
        418
    )