from flask import Flask, request, jsonify
from .credentials import connection_string
from sqlalchemy import create_engine, text

engine = create_engine(connection_string)

connection = engine.connect()
    

app = Flask(__name__)

@app.route("/ayahs50", methods=["GET"])
def fetch_50_ayahs():
    query = text("SELECT * FROM ayahs LIMIT 2")
    result = connection.execute(query)
    ayahs = list(map(list,result.fetchall()))
    print(ayahs)
    return jsonify({'ayahs': ayahs})
    return jsonify({'ayahs': [(1,2),(3,(4,5),6)]})

if __name__ == "__main__":
    app.run(debug=True)

