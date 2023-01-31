import json
from flask import Flask, request
from flask_restful import Resource, Api
import pymongo
from flask_restful import reqparse
from bson import json_util
from flask_cors import CORS,cross_origin
parser = reqparse.RequestParser()
parser.add_argument('id', type=int, help='id')
parser.add_argument('user', type=str, help='email of the user')
parser.add_argument('name', type=str, help='name')
parser.add_argument('link', type=str, help='link to video')
parser.add_argument('languages', type=list, help='languages we need')
parser.add_argument('cost', type=int, help='tokens to be charged')
parser.add_argument('validation', type=bool, help='do we need manual validation')
parser.add_argument('format', type=str, help='subtitling format')


# args = parser.parse_args()

# create the extension
app = Flask(__name__)


client = pymongo.MongoClient("mongodb+srv://test:test@cluster0.deamh7t.mongodb.net/?retryWrites=true&w=majority")

db = client.advaita
tasks = db.tasks
users = db.users

api = Api(app)
CORS(app)


class Task(Resource):
  def get(self):
    args = parser.parse_args()
    print(args)
    return tasks.find_one( {"_id": args["id"]} )
  
  def post(self):
    args = parser.parse_args()
    print(args)

    user_email = args["user"]
    user = users.find_one( { "email" : user_email } )

    token_balance = user["tokens"] - args["cost"]
    if( token_balance >= 0 ):
      user["tokens"] = token_balance
    else:
      return {
        "status": "Failed, not enough tokens."
      }
    
    task_id = tasks.insert_one(args).inserted_id

    # process task and wait for completion

    user["tasks"].append(task_id)
    users.update_one( {"email" : user_email},{"$set": {"tokens":token_balance,"tasks":user["tasks"]}}, True)
    return {
      "status" : "Success",
      "task_id" : str(task_id)
    }

class User(Resource):
  def get(self, email):
    return json.loads(json_util.dumps( users.find_one( { "email" : email } )))
 

  def post(self, email):
    args = parser.parse_args()
    
    users.insert_one( {
      "email": email,
      "tasks": [],
      "tokens": 100
    })

api.add_resource(Task, "/task")
api.add_resource(User, "/user/<email>")

if __name__ == "__main__":
  app.run(debug=True)
