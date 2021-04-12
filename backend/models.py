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

class Player(db.Model):
    player_id = db.Column(db.String(30), unique=True, index=True, primary_key=True)
    player_name = db.Column(db.String(30), index=True, index=True, primary_key=False)
    
    def __repr__(self):
        return '<Name: {}>'.format(self.player_name)


#TODO: Add remaining tables here