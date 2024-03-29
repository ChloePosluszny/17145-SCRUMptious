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

def createUser(encryptedUsername, encryptedUserID, encryptedPassword):
    # return created user or False if user already exists
    usersCollection = getCollection("Users")

    user = usersCollection.find_one({"userID" : encryptedUserID})
    # check if user already exists
    if user != None:
        return False
    document = {"username" : encryptedUsername, "userID" : encryptedUserID, "password" : encryptedPassword, "projects" : []}
    usersCollection.insert_one(document)
    return True

def getUser(encryptedUserID):
    # return user or None if user does not exist
    usersCollection = getCollection("Users")

    user = usersCollection.find_one({"userID" : encryptedUserID})
    # check if user exists
    if user == None :
        return None
    return user

def createProject(projectName, projectID, description, encryptedUserID):
    # return created project or False if project already exists
    projectsCollection = getCollection("Projects")
    hardwareDataCollection = getCollection("HardwareData")
    hardwareSets = hardwareDataCollection.find()

    project = projectsCollection.find_one({"projectID" : projectID})
    # check if project already exists
    if project != None :
        return False
    document = {"projectName": projectName, "projectID": projectID, "description": description, "userIDs": [encryptedUserID], "hardwareCheckedOut": {hardwareSet["hardwareSetName"]: 0 for hardwareSet in hardwareSets}}
    projectsCollection.insert_one(document)
    return True

def getProject(projectID):
    # return project or None if project does not exist
    projectsCollection = getCollection("Projects")

    project = projectsCollection.find_one({"projectID": projectID})
    # check if project exists
    if project == None:
        return None
    return project

def joinProject(projectID, encryptedUserID):
    # add user to project
    projectsCollection = getCollection("Projects")

    project = projectsCollection.find_one({"projectID": projectID})
    project["userIDs"].append(encryptedUserID)
    projectsCollection.update_one({"projectID": projectID}, {"$set": {"userIDs": project["userIDs"]}})

def getHardwareSets():
    # return all hardware sets
    hardwareDataCollection = getCollection("HardwareData")
    hardwareSets = hardwareDataCollection.find()
    return hardwareSets

def getUsername(user):
    #get the user's username
    return user["username"]

def getUserID(user):
    #take user from getUser and return their userID
    #run through dencrypter
    return user["userID"]

def getPassword(user):
    #take user from getUser and return their password
    return user["password"]

def getProjects(user):
    #take user from getUser and return their list of projects
    return user["projects"]

def deleteUser(encryptedUserID, encryptedPassword):
    #delete user data
    #TODO remove them from project as well once that section is implemented?
    usersCollection = getCollection("Users")
    usersCollection.delete_one({"userID" : encryptedUserID, "password" : encryptedPassword})

def clearAllUsers():
    #delete ALL user entries
    usersCollection = getCollection("Users")
    usersCollection.delete_many({})

def getUserProjects(encryptedUserID, encryptedPassword):
    #TODO get user's projects
    return None

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

# if __name__ == "__main__":
    # Example Usage
    #print("Example MongoDB Usage")
    #createUser("stephen", "testUser1", "testPassword1") #use encrypted user data
    #print(getName(getUser("testUser1", "testPassword1")))
    # deleteUser("testUser1", "testPassword1")