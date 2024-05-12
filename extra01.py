from flask import Flask, request, jsonify
from credentials import connection_string
from sqlalchemy import create_engine, text
from flask_cors import CORS

engine = create_engine(connection_string)

connection = engine.connect()

app = Flask(__name__)
CORS(app)      # Allow all origins

@app.route("/ayahs", methods=["GET"])
def fetch_50_ayahs():
    no_of_ayahs = request.args.get("no_of_ayahs", 50)
    query = text(f"SELECT * FROM ayahs LIMIT {no_of_ayahs}")
    result = connection.execute(query)
    ayahs = list(map(list,result.fetchall()))
    print(ayahs)
    return jsonify({'ayahs': ayahs}), 200
    # return jsonify({'ayahs': [(1,2),(3,(4,5),6)]})

if __name__ == "__main__":
    app.run(debug=True)  # Allow specific origin

