from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from werkzeug.utils import secure_filename
from dotenv import load_dotenv, find_dotenv
import os
import uuid
import hashlib


load_dotenv(find_dotenv())

app = Flask(__name__)

upload_folder = os.path.join(app.root_path, os.environ.get('UPLOAD_FOLDER'))

app.config['UPLOAD_FOLDER'] = upload_folder
app.config['MAX_CONTENT_PATH'] = os.environ.get('MAX_CONTENT_PATH')
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASS')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

mysql_api = MySQL(app)

if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)


@app.route('/documents', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']

        f_uuid = str(uuid.uuid4())
        f_name = secure_filename(f.filename)
        f_path = f_uuid + secure_filename(f.filename)

        f.save(upload_folder + f_path)

        f_size = os.stat(upload_folder + f_path).st_size

        cursor = mysql_api.connection.cursor()
        sql_q = 'INSERT INTO documents (name, file_path, size) VALUES (%s, %s, %s)'

        cursor.execute(sql_q, (f_name, f_path, f_size))
        mysql_api.connection.commit()

        return jsonify({'id': cursor.lastrowid})


@app.route('/documents/<id>', methods=['GET'])
def get_file(id):
    if request.method == 'GET':
        cursor = mysql_api.connection.cursor()
        sql_q = f"SELECT * FROM documents WHERE id='{id}'"

        result = cursor.execute(sql_q)
        data = cursor.fetchall()

        if not data:
            return 'Not found', 404

        value = {
            "id": data[0].get('id'),
            "name": data[0].get('name'),
            "size": data[0].get('size')
        }
        return jsonify(value)


@app.route('/documents/<id>/file', methods=['GET'])
def get_file_as_file(id):
    if request.method == 'GET':
        cursor = mysql_api.connection.cursor()
        sql_q = f"SELECT * FROM documents WHERE id='{id}'"

        result = cursor.execute(sql_q)
        data = cursor.fetchall()
        print(data)
        if not data:
            return 'Not found', 404

        try:
            return send_from_directory(os.environ.get('UPLOAD_FOLDER'), data[0]['file_path'], as_attachment=True)
        except:
            return 'Not found', 404


@app.route('/documents/<id>/hash', methods=['GET'])
def get_file_as_hash(id):
    if request.method == 'GET':
        cursor = mysql_api.connection.cursor()
        sql_q = f"SELECT * FROM documents WHERE id='{id}'"

        result = cursor.execute(sql_q)
        data = cursor.fetchall()

        if not data:
            return 'Not found', 404

        try:
            with open(upload_folder + data[0]['file_path'], 'rb') as f:
                data = f.read()
                data_hashed = hashlib.sha256(data).hexdigest()
                return jsonify({'hash': data_hashed})
        except:
            return 'Not found', 404


if __name__ == "__main__":
    app.run(debug=True, port=5002)
