from flask import Flask, render_template_string
import subprocess

app = Flask(__name__)

# La page HTML en tant que chaîne de caractères
html_code = '''
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lancer Snake</title>
    <script>
        function lancerSnake() {
            fetch('/run-snake')
                .then(response => response.text())
                .then(data => document.getElementById('resultat').innerHTML = data);
        }
    </script>
</head>
<body>
    <h1>Jeu Snake</h1>
    <button onclick="lancerSnake()">Lancer le jeu Snake</button>
    <div id="resultat"></div>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(html_code)

@app.route('/run-snake')
def run_snake():
    # Exécuter le script snake.py dans un nouveau processus
    subprocess.Popen(['python', 'snake.py'])
    return "Le jeu Snake est lancé !"

if __name__ == '__main__':
    app.run(debug=True)
