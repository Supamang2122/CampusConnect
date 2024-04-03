import os
import uuid
import requests

from flask import Flask, request

from google.cloud import datastore

app = Flask(__name__)
ds_client = datastore.Client()

# Get user_service API url from env vars
USER_SERVICE_URL = os.getenv('USER_SERVICE_URL')

def error500():
    resp = {
        'message': 'Internal error occured.'
    }
    return resp, 500


@app.route('/')
def index():
    return 'Posting service'

@app.route('/api/posts/create', methods=['POST'])
@app.route('/posting-service/api/posts/create', methods=['POST'])
def post_create():
    user_id = request.json['user_id']
    description = request.json['description']
    tags = request.json['tags']
    price = request.json['price']

    # Get auth token from request parameters
    id_token = request.headers["Authorization"].split(" ").pop()

    if not id_token:
        resp = {
            'message': 'Authorization parameter is required.'
        }
        return resp, 400

    # Call user_service to confirm user is logged in
    auth_check = check_auth(id_token)

    if(not auth_check):
        resp = {
            'message': 'Invalid auth token.'
        }
        return resp, 400

    posting = {
        'user_id': user_id,
        'order_id': str(uuid.uuid4()),
        'description': description,
        'tags':  tags,
        'price': price
    }

    with ds_client.transaction():
        incomplete_key = ds_client.key('Posting')
        order_entity = datastore.Entity(key=incomplete_key)
        order_entity.update(posting)
        ds_client.put(order_entity)

    return posting, 200

@app.route('/api/posts',methods=['GET'])
@app.route('/posting-service/api/posts',methods=['GET'])
def posts_get():
    query = ds_client.query(kind='Posting')

    tags = request.args.getlist('tags')

    if tags:
        query.add_filter('tags', 'IN', tags)

    results = list(query.fetch())
    return results, 200

@app.route('/api/posts/<user_id>',methods=['GET'])
@app.route('/posting-service/api/posts/<user_id>',methods=['GET'])
def post_get(user_id):

    query = ds_client.query(kind='Posting')
    query.add_filter('user_id', '=', user_id)
    results = list(query.fetch())

    return results, 200

def check_auth(id_token):
    # check if user is logged in using user_service
    url = USER_SERVICE_URL + '/user-service/api/users/auth'
    headers = {
        'Authorization': id_token
    }
    
    response = requests.get(url, headers=headers, timeout=5)
    if response.status_code == 200:
        return True
    else:
        # User service is not accessible
        return False

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))