import pymongo as mongo
from pymongo import MongoClient
def get_database():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://ChloePause:1111-1111-1111@atlascluster.pyd293q.mongodb.net/"
 
   # Create a connection using MongoClient.
   client = MongoClient(CONNECTION_STRING)
 
   # Create database object
   return client

def create_user(username, password):
    #Send data to mongoDB cluster
    return None
    
def delete_user(username):
    #delete user data
    return None

def get_projects(username):
    #get user's projects
    return None

def create_project():
    #create a project
    return None

def get_data(project):
    #get json data from mongoDB cluster
    return None

def update_data():
    #change hardware data
    return None
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()