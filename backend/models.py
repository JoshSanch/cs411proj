import os

from flask import Flask, make_response, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

project_dir = os.path.dirname(os.path.abspath(__file__))

##not sure about this part (copied from tutorial, might want to look into it). Might not be necessary
database_file = "sqlite:///{}".format(os.path.join(project_dir, "smashproj.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)


class Players(db.Model):
    player_id = db.Column(db.String(30), unique=True, primary_key=True)
    player_name = db.Column(db.String(30))
    
    def __repr__(self):
        return '<Name: {}>'.format(self.player_name)


class Stages(db.Model):
    stage_id = db.Column(db.Integer, unique=True, primary_key=True)
    stage_name = db.Column(db.String(30))


class Games(db.Model):
    game_id = db.Column(db.Integer, unique=True, primary_key=True)
    winner_id = db.Column(db.String(30))
    loser_id = db.Column(db.String(30))
    winner_score = db.Column(db.Integer)
    loser_score = db.Column(db.Integer)
    winner_char_id = db.Column(db.Integer)
    loser_char_id = db.Column(db.Integer)
    stage_id = db.Column(db.Integer)
    set_id = db.Column(db.String(30))


class Characters(db.Model):
    char_id = db.Column(db.Integer, unique=True, primary_key=True)
    char_name = db.Column(db.String(30))


class Sets(db.Model):
    set_id = db.Column(db.String(30), unique=True, primary_key=True)
    set_winner_id = db.Column(db.String(30))
    set_loser_id = db.Column(db.String(30))