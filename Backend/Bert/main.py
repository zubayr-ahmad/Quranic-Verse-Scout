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
    query = request.args.get("query", "Allah loves his prophets.")
    print("Importing Ayahs")
    ayahs = import_ayahs()
    print("Ayahs Imported")
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

@app.route("/get_surah_summary", methods=["GET"])
def get_surah_summary():
    print("Surah ID: ", request.args.get("surah_id"))
    surah_summary = "Surha Fatiha is the first surah of the Quran. It is also known as Umm-ul-Quran or the Mother of the Quran. It is a short surah with only 7 verses. Surah Fatiha is recited in every unit of the prayer. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran. It is a prayer for guidance and mercy from Allah. Surah Fatiha is also known as the Opening because it is the opening chapter of the Quran. Surah Fatiha is a summary of the entire Quran."

    return jsonify({"summary": surah_summary})




if __name__ == "__main__":
    app.run(debug=True)  # Allow specific origins