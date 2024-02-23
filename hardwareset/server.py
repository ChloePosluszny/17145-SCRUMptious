from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/',methods=["GET"])
def index():
    return send_from_directory(app.static_folder,"index.html")

# Define other routes and backend logic as needed

if __name__ == '__main__':
    app.run(debug=True)

