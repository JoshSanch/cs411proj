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
                query_data = json.loads(request.data)
                player = Players(player_id=query_data['player_id'], player_name=query_data['player_name'])
                db.session.add(player)
                db.session.commit()
                return make_response(jsonify(message="Player successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting player'), 500)

        if table_slug == 'stages':
            try:
                query_data = json.loads(request.data)
                stage = Stages(stage_id=query_data['stage_id'], stage_name=query_data['stage_name'])
                db.session.add(stage)
                db.session.commit()
                return make_response(jsonify(message="Stage successfully created."), 200)
            except Exception as ex:
                print(repr(ex))
                return make_response(jsonify(message='Error inserting stage'), 500)

        if table_slug == 'games':
            try:  
                query_data = json.loads(request.data)
                game = Games(
                    game_id=query_data['game_id'], 
                    winner_id=query_data['winner_id'], 
                    loser_id=query_data['loser_id'], 
                    winner_score=query_data['winner_score'],
                    loser_score=query_data['loser_score'], 
                    winner_char_id=query_data['winner_char_id'], 
                    loser_char_id=query_data['loser_char_id'], 
                    stage_id=query_data['stage_id'],
                    set_id=query_data['set_id']
                )
                db.session.add(game)
                db.session.commit()
                return make_response(jsonify(message="Game successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting game'), 500)


        if table_slug == 'sets':
            try:
                query_data = json.loads(request.data)
                sets = Sets(set_id=query_data['set_id'], set_winner_id=query_data['set_winner_id'], set_loser_id=query_data['set_loser_id'])
                db.session.add(sets)
                db.session.commit()
                return make_response(jsonify(message="Set successfully created."), 200)
            except:
                return make_response(jsonify(message='Error inserting set'), 500)


        if table_slug == 'characters':
            try:
                query_data = json.loads(request.data)
                character = Characters(char_id=query_data['char_id'], char_name=query_data['char_name'])
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
            result = class_map[table_slug].query.filter(*query_data).all()
            result = [i.to_dict() for i in result]
            return make_response(jsonify(result), 200)
        except Exception as ex:
            print(repr(ex))
            return make_response(jsonify(message=f'Error searching on {table_slug}'), 500)


    elif operation == 'update':
        if table_slug == 'players':
            query_data = json.loads(request.data)
            try:
                player = Players.query.filter_by(player_id=query_data['player_id']).first()
                player.player_name = query_data['player_name']
                db.session.commit()
                return make_response('Successfully updated player', 200)
            except:
                return make_response('Error updating player', 500)

        if table_slug == 'stages':
            query_data = json.loads(request.data)
            try:
                stage = Stages.query.filter_by(stage_id=query_data['stage_id']).first()
                stage.stage_name = query_data['stage_name']
                db.session.commit()
                return make_response('Successfully updated stage', 200)
            except:
                return make_response('Error updating stage', 500)

        if table_slug == 'games':
            query_data = json.loads(request.data)
            try:
                game = Games.query.filter_by(game_id=query_data['game_id']).first()
                game.winner_id = query_data['winner_id']
                game.loser_id = query_data['loser_id']
                game.winner_score = query_data['winner_score']
                game.loser_score = query_data['loser_score']
                game.winner_char_id = query_data['winner_char_id']
                game.loser_char_id = query_data['loser_char_id']
                game.stage_id = query_data['stage_id']
                game.set_id = query_data['set_id']
                
                db.session.commit()
                return make_response('Successfully updated game', 200)
            except:
                return make_response('Error updating game', 500)

        if table_slug == 'characters':
            query_data = json.loads(request.data)
            try:
                num_rows_updated = db.session.query(Characters).filter_by(char_id=query_data['char_id']).update(dict(char_name=query_data['char_name']))
                
                db.session.commit()
                return make_response('Successfully updated character', 200)
            except Exception as ex:
                print(repr(ex))
                return make_response('Error updating character', 500)

        if table_slug == 'sets':
            query_data = json.loads(request.data)
            try:
                sets = Sets.query.filter_by(set_id=query_data['set_id']).first()
                sets.set_winner_id = query_data['set_winner_id']
                sets.set_loser_id = query_data['set_loser_id']
                
                db.session.commit()
                return make_response('Successfully updated set', 200)
            except:
                return make_response('Error updating set', 500)
        
        

    elif operation == 'delete':
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
            result = class_map[table_slug].query.filter(*query_data).delete()
            return make_response(jsonify(message='Successfully deleted data associated with query.'), 200)
        except Exception as ex:
            print(repr(ex))
            return make_response(jsonify(message='Error deleting data'), 500)

    return make_response(
        "I'm slugging!",
        418
    )