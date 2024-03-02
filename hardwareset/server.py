from flask import Flask, send_from_directory, request, jsonify, redirect, url_for, render_template
from cipher import encrypt,decrypt


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
    if username == "Rahman": #hardcoded for testing
        return jsonify({'success': False, 'message': 'Username already exists'}), 401       
    else:
        return jsonify({'success': True, 'Name': name, 'Username':username ,'Password':encryptedPassword }),200 

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if username == "Rahman" and password =="password123": #hardcoded for testing
        return jsonify({'success': True, 'Username':username ,'Password': password}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
    
# @app.route('/projects')
# def projects():
#     return 0

if __name__ == '__main__':
    app.run(debug=True)

