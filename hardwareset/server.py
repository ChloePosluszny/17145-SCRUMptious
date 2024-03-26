from flask import Flask, send_from_directory, request, jsonify, redirect, url_for, render_template
from cipher import encrypt,decrypt
from database import createUser,getUser,getProjects

app = Flask(__name__, static_folder='./build', static_url_path='/')
@app.route('/', methods=["GET"])
def index():
   return send_from_directory(app.static_folder, "index.html")
@app.errorhandler(404)
def not_found(e):
  return send_from_directory('./build','index.html')


@app.route('/register', methods=['POST'])
def register():
    n = 36
    d=-1
    data = request.json
    name = data['name']
    username = data['username']
    password = data['password']
    encryptedName = encrypt(name,n,d)
    encryptedUsername = encrypt(username,n,d)
    encryptedPassword = encrypt(password,n,d)

    userExists = createUser(encryptedName,encryptedUsername, encryptedPassword)

    if userExists: #hardcoded for testing
         return jsonify({'success': True, 'Name': name, 'Username':encryptedUsername ,'Password':encryptedPassword }),200     
    else: #user doesn't exist
        return jsonify({'success': False, 'message': 'Username already exists'}), 401  

@app.route('/login', methods=['POST'])
def login():
    n = 36
    d=-1
    data = request.json
    username = data['username']
    password = data['password']
    encryptedUsername = encrypt(username,n,d)
    encryptedPassword = encrypt(password,n,d)
    user = getUser(encryptedUsername)
    if user['password'] != encryptedPassword or user == None: #hardcoded for testing
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'success': True, 'Username':username ,'Password': password}), 200
    

@app.route('/createProject', methods=['POST'])
def createProject():
    data = request.json
    name = data['name']
    username = data['username']
    description = data['description']
    projectID = data['projectID']
    print(data)
    return jsonify({'success': True, 'Username':username, 'Description': description, 'projectID': projectID }), 200

@app.route('/joinProject', methods=['POST'])
def joinProject():
    data = request.json
    username = data['username']
    projectID = data['projectID']
    print(data)
    return jsonify({'success': True, 'Username':username, 'projectID': projectID}), 200

# @app.route('/projects')
# def projects():
#     return 0

@app.route('/fetchProjects', methods=['POST'])
def fetchProjects():
    username = request.json
    encryptedUsername = encrypt(username,36,-1)
    user = getUser(encryptedUsername)
    projects = getProjects(user)
    return jsonify({'success': True, 'projects': projects}), 200

if __name__ == '__main__':
    app.run(debug=True)

