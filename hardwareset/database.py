#pip install certifi
#pip install pymongo

import certifi
import pymongo as mongo
from pymongo import MongoClient


def getCluster():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://ChloePause:1111-1111-1111@atlascluster.pyd293q.mongodb.net/"
 
   # Create a connection using MongoClient.
   cluster = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
 
   # Create database object
   return cluster

def getDatabase():
    #get database
    return getCluster()["HardwareCheckout"]

def getCollection(collection_name):
    #get collection: Users, Projects, HardwareData
    return getDatabase()[collection_name]

def createUser(encryptedName,encryptedUsername, encryptedPassword):
    #Send encrypted user data to mongoDB cluster
    usersCollection = getCollection("Users")
    document = {"name" : encryptedName, "username" : encryptedUsername, "password" : encryptedPassword, "projects" : []}
    
    if usersCollection.find_one({"username" : encryptedUsername}) != None :
        #Check that username and password combination doesn't already exist
        print("User already exists.")
        return False
    
    usersCollection.insert_one(document)
    return True

def getUser(encryptedUsername, encryptedPassword):
    #grab the user data from MongoDB
    usersCollection = getCollection("Users")
    user = usersCollection.find_one({"username" : encryptedUsername, "password" : encryptedPassword})
    return user

def getName(user):
    #get the user's name
    return user["name"]

def getUsername(user):
    #take user from getUser and return their username
    #run through dencrypter
    return user["username"]

def getPassword(user):
    #take user from getUser and return their password
    return user["password"]

def getProjects(user):
    #take user from getUser and return their list of projects
    return user["projects"]

def deleteUser(encrypted_username, encrypted_password):
    #delete user data
    #TODO remove them from project as well once that section is implemented?
    usersCollection = getCollection("Users")
    usersCollection.delete_one({"username" : encrypted_username, "password" : encrypted_password})

def clearAllUsers():
    #delete ALL user entries
    usersCollection = getCollection("Users")
    usersCollection.delete_many({})

def getUserProjects(encryptedUsername, encryptedPassword):
    #TODO get user's projects
    return None

def createProject(encryptedUsername, encryptedPassword, projectName):
    #create a project
    #TODO add users to project?
    projectsCollection = getCollection("Projects")
    document = {"name" : projectName, "owner_username" : encryptedUsername, "owner_password" : encryptedPassword, "checkedOut" : 0}

    if projectsCollection.find_one({"name" : projectName, "username" : encryptedUsername, "password" : encryptedPassword}) != None :
        #Check that username and password combination doesn't already exist
        print("Project already exists.")
        return False

    projectsCollection.insert_one(document)
    return True

def getProject(project):
    #get the project from the database
    projectsCollection = getCollection("Projects")
    proj = projectsCollection.find_one({"name" : project})
    return proj

def getProjectHardwareData(project):
    #get amount of checked out hardware
    proj = getProject(project)
    return proj["checkedOut"]

def setProjectHardwareData(project, amount):
    #set amount of checked out hardware for a project and total availability
    projectsCollection = getCollection("Projects")
    
    current = getProjectHardwareData(project)
    currentAvailability = getAvailabilityData()
    
    #We need to operate on the hardware availability not including the current projects checked out hardware
    oldAvailability = currentAvailability + current
    newAvailability = oldAvailability - amount
    
    if (setAvailabilityData(newAvailability)):
        #Was able to set new data
        projectsCollection.update_one({"name" : project}, {"$set": {"checkedOut" : amount}})
        return True
    return False

def clearAllProjects():
    #Remove ALL projects from the database
    projectsCollection = getCollection("Projects")
    projectsCollection.delete_many({})

def getCapacityData():
    #get hardware capacity data from database
    hardwareDataCollection = getCollection("HardwareData")
    capacityDocument = hardwareDataCollection.find_one({"_id" : "capacity"})

    return capacityDocument["capacity"]

def getAvailabilityData():
    #get hardware availability data from database
    hardwareDataCollection = getCollection("HardwareData")
    availabilityDocument = hardwareDataCollection.find_one({"_id" : "availability"})

    return availabilityDocument["availability"]

def setCapacityData(amount):
    #set hardware capacity data on database
    hardwareDataCollection = getCollection("HardwareData")
    
    hardwareDataCollection.update_one({"_id" : "capacity"}, {"$set": {"capacity" : amount}})

def setAvailabilityData(amount):
    #set hardware availability data on database
    #add check for overflow
    hardwareDataCollection = getCollection("HardwareData")
    
    if amount + getAvailabilityData() > getCapacityData():
        print("Cannot set availability above capacity.")
        return False
    
    hardwareDataCollection.update_one({"_id" : "availability"}, {"$set": {"availability" : amount}})
    return True

def clearHardwareData():
    #Clear Hardware Data back to default (0)
    setCapacityData(0)
    setAvailabilityData(0)

if __name__ == "__main__":
    # Example Usage
    #print("Example MongoDB Usage")
    #createUser("stephen", "testUser1", "testPassword1") #use encrypted user data
    #print(getName(getUser("testUser1", "testPassword1")))
    # deleteUser("testUser1", "testPassword1")