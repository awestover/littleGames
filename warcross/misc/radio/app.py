
import os
from flask import Flask, render_template

app = Flask(__name__)

songVotes = {}
for f in os.listdir("data"):
    songVotes[f] = 0

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == "__main__":
   app.run(debug=True) 


