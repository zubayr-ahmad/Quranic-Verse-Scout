from sentence_transformers import SentenceTransformer
import faiss
import pickle
import os
import re
import numpy as np

BASE_DIR = os.getcwd()+'/Backend/Bert/'
def import_model(model_name):
    """import model from sentence transformers"""
    directory = BASE_DIR + 'Runtime_Data/'
    filename = f'{directory}{model_name}.pkl'
    
    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

    if os.path.isfile(filename):
        model = pickle.load(open(filename, 'rb'))
        return model

    model = SentenceTransformer(model_name)
    pickle.dump(model, open(filename, 'wb'))
    return model

def import_ayahs():
    """load ayahs from pickle file"""
    # print("____________________________________________________________________")
    # print(os.getcwd())
    directory = BASE_DIR
    with open(f"{directory}ayahs.pkl", "rb") as f:
        ayahs = pickle.load(f)
        return ayahs

def process_ayahs(ayahs):
    """clean ayahs text and return cleaned ayahs"""
    directory = BASE_DIR + 'Runtime_Data/'
    filename = f'{directory}cleaned_ayahs.pkl'
    
    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

    if os.path.isfile(filename):
        cleaned_ayahs = pickle.load(open(filename, 'rb'))
        return cleaned_ayahs
    def clean_text(text):
        text = text.lower()
        text = re.sub(r'-', ' ', text)
        text = re.sub(r'[^\w\s]', '', text)
        return text
    vfunc = np.vectorize(clean_text)
    cleaned_ayahs = vfunc(ayahs)
    pickle.dump(cleaned_ayahs, open(filename, 'wb'))
    return cleaned_ayahs

def generate_embeddings(model_name, model, cleaned_ayahs):
    """generate embeddings for ayahs using model"""
    directory = BASE_DIR+'Embeddings/'
    filename = f'{directory}{model_name}.pkl'
    
    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

    if os.path.isfile(filename):
        embeddings = pickle.load(open(filename, 'rb'))
        return embeddings
    else:
        embeddings = model.encode(cleaned_ayahs)
        pickle.dump(embeddings, open(filename, 'wb'))
    return embeddings

def get_index(embeddings):
    """create index for embeddings"""
    directory = BASE_DIR + 'Runtime_Data/'
    filename = f'{directory}index.faiss'
    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

    if os.path.isfile(filename):
        index = faiss.read_index(filename)
        return index
    embedding_dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(embedding_dim)
    index.add(embeddings)
    faiss.write_index(index, filename)
    return index


def search(query, model, index, ayahs, k=10):
    # Convert the query to an embedding
    query_embedding = model.encode([query])

    # Search the index for the top k most similar embeddings
    distances, indices = index.search(query_embedding, k)
    # return indices[0], distances
    # Retrieve the corresponding verses and their indices
    # similar_verses = [(ayahs[idx], idx) for idx in indices[0]]
    # distances_similar_verses = [(dist, ayahs[idx], idx) for dist, idx in zip(distances[0], indices[0])]
    # print(similar_verses)
    # return similar_verses, distances_similar_verses
    return indices[0], distances

def main(query, no_of_ayahs=10):
    model_name = 'all-mpnet-base-v2'
    model = import_model(model_name)
    ayahs = import_ayahs()
    cleaned_ayahs = process_ayahs(ayahs)
    embeddings = generate_embeddings(model_name, model,  cleaned_ayahs)
    index = get_index(embeddings)
    # query = "find something from quran"
    similar_verses, distances_similar_verses = search(query, model, index, ayahs, no_of_ayahs)
    return similar_verses, distances_similar_verses