from flask import Flask

app = Flask(__name__)


@app.route('/')
def ping():
    return "Hello world!"


if __name__ == "__main__":
    app.run()
