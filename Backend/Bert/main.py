from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import db_credentials as creds
from model import main, import_ayahs

mydb = mysql.connector.connect(
    host=creds.host,
    user=creds.user,
    password=creds.password,
    database=creds.database,
    port = creds.port
)
mycursor = mydb.cursor()



app = Flask(__name__)
CORS(app)      # Allow all origins



@app.route("/get_ayahs", methods=["GET"])
def get_ayahs():
    no_of_ayahs = request.args.get("no_of_ayahs", 10)
    query = request.args.get("query", "find something from quran")
    ayahs = import_ayahs()
    top_ayahs_indexes, _ = main(query, no_of_ayahs)  
    ayah = create_ayah_json(list(top_ayahs_indexes), ayahs)
    return {"ayahs": ayah}

def create_ayah_json(indexes, ayahs):
    top_ayahs = []
    for idx in indexes:
        mycursor.execute(f"SELECT * FROM ayahs WHERE id = {idx+1}")
        ayat = mycursor.fetchall()
        ayat_obj = {"text":ayat[0][2], "verse_id":ayat[0][0], "number_in_surah":ayat[0][3],'surah_id':ayat[0][5], "ayat_number":f"{ayat[0][5]}:{ayat[0][3]}", "english": f"{ayahs[idx]}"}
        top_ayahs.append(ayat_obj)
    return top_ayahs




if __name__ == "__main__":
    app.run(debug=True)  # Allow specific origins