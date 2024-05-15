from flask import Flask, request, jsonify
from flask_cors import CORS
import db_credentials as creds
import mysql.connector
import db_credentials as creds
import pickle
import re
import numpy as np

import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

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
    query_vector = get_query_vector(query)
    top_ayahs = get_top_ayahs(query_vector, no_of_ayahs)
    return {"ayahs":top_ayahs}

def get_query_vector(query):
    query = clean_text(query)
    query_words = query.split()
    unique_words_arr = load_unique_words_arr()
    query_vector = np.zeros((5480,1))
    for word in query_words:
        if word in unique_words_arr[:,1]:
            query_vector[np.where(unique_words_arr[:,1] == word)[0]] = 1
    return query_vector

def get_top_ayahs(query_vector, no_of_ayahs):
    no_of_ayahs = int(no_of_ayahs)
    term_matrix = load_term_matrix()
    ayahs = load_ayahs()
    result = np.dot(term_matrix, query_vector)
    print(result.shape)
    top_ayahs_idx = np.argsort(result, axis=0)[::-1][:no_of_ayahs, :]
    top_ayahs = []
    for idx in top_ayahs_idx:
        mycursor.execute(f"SELECT * FROM ayahs WHERE id = {idx[0]+1}")
        ayat = mycursor.fetchall()
        ayat_obj = {"text":ayat[0][2], "verse_id":ayat[0][0], 'surah_id':ayat[0][5], "ayat_number":f"{ayat[0][5]}:{ayat[0][3]}", "english":ayahs[idx[0]]}
        top_ayahs.append(ayat_obj)
    return top_ayahs


def clean_text(text):
    text = text.lower()
    text = re.sub(r'-', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

def load_term_matrix():
    term_matrix = []
    for i in range(20):
        with open(f'term_matrix/term_matrix_part_{i}.pkl', 'rb') as f:
            term_matrix.append(pickle.load(f))

    # Concatenate all chunks back into one array
    term_matrix = np.concatenate(term_matrix, axis=0)
    return term_matrix

def load_ayahs():
    with open("ayahs.pkl", "rb") as f:
        ayahs = pickle.load(f)
    return ayahs

def load_unique_words_arr():
    with open("unique_words.pkl", "rb") as f:
        unique_words_arr = pickle.load(f)
    return unique_words_arr

if __name__ == "__main__":
    app.run(debug=True)  # Allow specific origin

