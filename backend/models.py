import os

from flask import Flask, make_response, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

project_dir = os.path.dirname(os.path.abspath(__file__))

##not sure about this part (copied from tutorial, might want to look into it). Might not be necessary
#database_file = "sqlite:///{}".format(os.path.join(project_dir, "smashproj.db"))

app = Flask(__name__)
#app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)


class Players(db.Model):
    __tablename__ = "Players"

    player_id = db.Column(db.String(30), unique=True, primary_key=True)
    player_name = db.Column(db.String(30))
    
    def __repr__(self):
        return '<Name: {}>'.format(self.player_name)

    def to_dict(self):
        return {
            "player_id": self.player_id,
            "player_name": self.player_name
        }


class Stages(db.Model):
    __tablename__ = "Stages"

    stage_id = db.Column(db.Integer, unique=True, primary_key=True)
    stage_name = db.Column(db.String(30))

    def to_dict(self):
        return {
            "stage_id": self.stage_id,
            "stage_name": self.stage_name
        }


class Games(db.Model):
    __tablename__ = "Games"

    game_id = db.Column(db.Integer, unique=True, primary_key=True)
    winner_id = db.Column(db.String(30))
    loser_id = db.Column(db.String(30))
    winner_score = db.Column(db.Integer)
    loser_score = db.Column(db.Integer)
    winner_char_id = db.Column(db.Integer)
    loser_char_id = db.Column(db.Integer)
    stage_id = db.Column(db.Integer)
    set_id = db.Column(db.String(30))

    def to_dict(self):
        return {
            "game_id": self.game_id,
            "winner_id": self.winner_id,
            "loser_id": self.loser_id,
            "winner_score": self.winner_score,
            "loser_score": self.loser_score,
            "winner_char_id": self.winner_char_id,
            "loser_char_id": self.loser_char_id,
            "stage_id": self.stage_id,
            "set_id": self.set_id
        }


class Characters(db.Model):
    __tablename__ = "Characters"

    char_id = db.Column(db.Integer, unique=True, primary_key=True)
    char_name = db.Column(db.String(30))

    def to_dict(self):
        return {
            "char_id": self.char_id,
            "char_name": self.char_name
        }


class Sets(db.Model):
    __tablename__ = "Sets"

    set_id = db.Column(db.String(30), unique=True, primary_key=True)
    set_winner_id = db.Column(db.String(30))
    set_loser_id = db.Column(db.String(30))

    def to_dict(self):
        return {
            "set_id": self.set_id,
            "set_winner_id": self.set_winner_id,
            "set_loser_id": self.set_loser_id
        }