import pymongo as mongo
from pymongo import MongoClient
def getCluster():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://ChloePause:1111-1111-1111@atlascluster.pyd293q.mongodb.net/"
 
   # Create a connection using MongoClient.
   cluster = MongoClient(CONNECTION_STRING)
 
   # Create database object
   return cluster

def getDatabase():
    #get database
    return getCluster()["HardwareCheckout"]

def getCollection(collection_name):
    #get collection: Users, Projects, HardwareData
    return getDatabase()[collection_name]

def createUser(username, password):
    #Send data to mongoDB cluster
    users_collection = getCollection("Users")
    users_collection.insert_one({})
    
    return None
    
def deleteUser(username):
    #delete user data
    return None

def getProjects(username):
    #get user's projects
    return None

def createProject():
    #create a project
    return None

def getHardwareData(project):
    #get json data from mongoDB cluster
    return None

def updateData():
    #change hardware data
    return None
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   cluster = getCluster()