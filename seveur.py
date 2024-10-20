from flask import Flask, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run-snake')
def run_snake():
    # Exécute le script snake.py dans un nouveau processus
    subprocess.Popen(['python', 'snake.py'])
    return "Le jeu Snake est lancé !"

if __name__ == '__main__':
    app.run(debug=True)
