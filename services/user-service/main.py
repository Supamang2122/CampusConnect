import base64
import datetime
import json
import os
import uuid
import firebase_admin

import google.auth.transport.requests
import google.oauth2.id_token
from google.cloud import datastore
from firebase_admin import auth

from flask import Flask, request

app = Flask(__name__)

ds_client = datastore.Client()
fb_app = firebase_admin.initialize_app()
HTTP_REQUEST = google.auth.transport.requests.Request()

def error500():
    resp = {
        'message': 'Internal error occured.'
    }
    return resp, 500


@app.route('/')
def index():
    return 'User service'

@app.route('/api/users/create', methods=['POST'])
@app.route('/user-service/api/users/create', methods=['POST'])
def user_create():
    user_name = request.json['user_name']
    psw = request.json['password']
    
    user = auth.create_user(
        email = user_name,
        password = psw,
    )
    return user.uid, 200

@app.route('/api/users/<uid>',methods=['GET'])
@app.route('/user-service/api/users/<uid>',methods=['GET'])
def user_name_get(uid):

    query = ds_client.query(kind='User')
    query.add_filter('user_name', '=', uid)
    results = list(query.fetch())

    return results[0], 200

@app.route('/api/users/auth',methods=['GET'])
@app.route('/user-service/api/users/auth',methods=['GET'])
def user_auth():
    id_token = request.headers["Authorization"]
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return "Unauthorized", 401
    return "Authorized", 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))