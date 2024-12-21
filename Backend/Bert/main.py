from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import db_credentials as creds
from model import main, import_ayahs
from groq import Groq

from google.cloud import translate_v2 as translate


import boto3

def translate_to_urdu(text, aws_region="us-east-1"):
    """
    Translates English text into Urdu using the Amazon Translate API.

    Parameters:
        text (str): The English text to be translated.
        aws_region (str): AWS region where the Translate service is hosted. Default is "us-east-1".

    Returns:
        str: Translated text in Urdu.
    """
    # Initialize the Translate client
    translate_client = boto3.client('translate', region_name=aws_region)
    
    try:
        # Call the Translate API
        response = translate_client.translate_text(
            Text=text,
            SourceLanguageCode="en",  # Source language (English)
            TargetLanguageCode="ur"   # Target language (Urdu)
        )
        # Extract the translated text from the response
        translated_text = response['TranslatedText']
        return translated_text
    
    except Exception as e:
        print(f"Error during translation: {e}")
        return None



mydb = mysql.connector.connect(
    host=creds.host,
    user=creds.user,
    password=creds.password,
    database=creds.database,
    port = creds.port
)
mycursor = mydb.cursor()

# Initialize Groq client
client = Groq(api_key=creds.api_key)
app = Flask(__name__)
CORS(app)      # Allow all origins

def translate_text(text, target_language="ur"):
    client = translate.Client()
    translation = client.translate(text, target_language=target_language)
    return translation["translatedText"]


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


@app.route('/summarize', methods=['GET'])
def summarize_records():
    try:
        # Extract the surah_id from request parameters
        surah_id = request.args.get('surah_id')
        if not surah_id:
            return jsonify({"error": "surah_id is required"}), 400


        # Query to fetch records based on ayad_id
        query = "SELECT data FROM ayah_edition WHERE surah_id = %s"
        mycursor.execute(query, (surah_id,))
        records = mycursor.fetchall()
        if not records:
            return jsonify({"error": "No records found for the given surah_id"}), 404

        # Combine all records into a single text
        combined_text = "\n".join(str(record) for record in records)
        # print(combined_text)
        # Use Groq Llama API to summarize the combined text
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Following text contain ayahs of surah. I want you to summarize the surah. Dont mention the surah name. Just right away give the summary without any additional text \n Ayahs: {combined_text}"
                }
            ],
            model="llama3-8b-8192",
            stream=False,
        )
        summary = chat_completion.choices[0].message.content
        
        # Return the summary in the response
        return jsonify({"summary": summary}), 200

    except mysql.connector.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500
    
@app.route('/translate', methods=['GET'])
def translate_summary():
    try:
        # Extract the surah_id from request parameters
        summary = request.args.get('summary')
        if not summary:
            return jsonify({"error": "summary is required"}), 400

        
        # Return the summary in the response
        return jsonify({"summary": translate_to_urdu(summary)}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500



if __name__ == "__main__":
    app.run(debug=True)
