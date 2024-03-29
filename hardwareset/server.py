from flask import Flask, send_from_directory, request, jsonify, redirect, url_for, render_template
from cipher import encrypt, decrypt
import database as db

SHIFT_AMOUNT = 36
SHIFT_DIRECTION = -1

app = Flask(__name__, static_folder='./build', static_url_path='/')
@app.route('/', methods=["GET"])
def index():
   return send_from_directory(app.static_folder, "index.html")
@app.errorhandler(404)
def not_found(e):
  return send_from_directory('./build','index.html')


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    userID = data['userID']
    password = data['password']
    encryptedUsername = encrypt(username, SHIFT_AMOUNT, SHIFT_DIRECTION)
    encryptedUserID = encrypt(userID, SHIFT_AMOUNT, SHIFT_DIRECTION)
    encryptedPassword = encrypt(password, SHIFT_AMOUNT, SHIFT_DIRECTION)

    userCreated = db.createUser(encryptedUsername, encryptedUserID, encryptedPassword)
    # check if user was created
    if userCreated != False:
        return jsonify({'success': True, 'userID': userID}), 200     
    else:
        return jsonify({'success': False, 'message': 'UserID already exists'}), 401  

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    userID = data['userID']
    password = data['password']
    encryptedUserID = encrypt(userID, SHIFT_AMOUNT, SHIFT_DIRECTION)
    encryptedPassword = encrypt(password, SHIFT_AMOUNT, SHIFT_DIRECTION)

    user = db.getUser(encryptedUserID)
    # check if user exists and password is correct
    if user != None and user['password'] == encryptedPassword:
        return jsonify({'success': True, 'userID': userID}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid userID or password'}), 401
    

@app.route('/createProject', methods=['POST'])
def createProject():
    data = request.json
    projectName = data['projectName']
    projectID = data['projectID']
    description = data['description']
    userID = data['userID']
    encryptedUserID = encrypt(userID, SHIFT_AMOUNT, SHIFT_DIRECTION)

    projectCreated = db.createProject(projectName, projectID, description, encryptedUserID)
    # check if project was created
    if projectCreated != False:
        return jsonify({'success': True, 'projectID': projectID}), 200
    else:
        return jsonify({'success': False, 'message': 'ProjectID already exists'}), 401

@app.route('/joinProject', methods=['POST'])
def joinProject():
    data = request.json
    userID = data['userID']
    projectID = data['projectID']
    encryptedUserID = encrypt(userID, SHIFT_AMOUNT, SHIFT_DIRECTION)

    project = db.getProject(projectID)
    # check if project exists
    if project != None:
        project['userIDs'].append(encryptedUserID)
        db.joinProject(projectID, encryptedUserID)
        return jsonify({'success': True, 'projectID': projectID}), 200
    else:
        return jsonify({'success': False, 'message': 'ProjectID does not exist'}), 401

# @app.route('/projects')
# def projects():
#     return 0

@app.route('/fetchProjects', methods=['POST'])
def fetchProjects():
    data = request.json
    userID = data['userID']
    encryptedUserID = encrypt(userID, SHIFT_AMOUNT, SHIFT_DIRECTION)
    user = db.getUser(encryptedUserID)
    projects = db.getProjects(user)
    return {'success': True, 'projects': projects}, 200

@app.route('/fetchHardwareSets', methods=['POST'])
def fetchHardwareSets():
    hardwareSetsDocuments = db.getHardwareSets()
    hardwareSets = []
    idx = 0
    for hardwareSet in hardwareSetsDocuments:
        hardwareSets.append({'name': hardwareSet['hardwareSetName'], 'index': idx, 'capacity': hardwareSet['hardwareSetCapacity'], 'available': hardwareSet['hardwareSetAvailability']})
        idx += 1
    return {'success': True, 'hardwareSets': hardwareSets}, 200

if __name__ == '__main__':
    app.run(debug=True)