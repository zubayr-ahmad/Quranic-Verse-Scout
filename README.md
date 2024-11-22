# Quran Verse Scout

Quran Verse Scout is an innovative tool designed to help users find specific Quranic verses through context-based searching and provide accurate, non-hallucinated summarizations of Surahs using advanced RAG (Retrieval-Augmented Generation) technology.

## 🌟 Features

### 1. Contextual Verse Search
- Find Quranic verses by describing their context or meaning
- Utilizes semantic search technology to match context with relevant verses
- Returns the most likely matches from the Quran

### 2. Surah Summarizer
- Get concise, accurate summaries of any Surah
- Implements RAG-based solution to prevent hallucinations
- Search Surahs by name or number
- Summaries are generated directly from the verses, ensuring accuracy

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js and npm
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Quran-Verse-Scout.git
cd Quran-Verse-Scout
```

2. Set up the Backend

Choose either pip or conda for installing Python dependencies:

Using pip:
```bash
pip install -r requirements.txt
```

OR using conda:
```bash
conda install --file requirements_conda.txt
```

3. Set up the Frontend
```bash
cd react-app
npm install
```

## 🔧 Running the Application

### Start the Backend Server
```bash
cd Backend/Bert
python main.py
```
The backend server will start running on http://localhost:5000

### Start the Frontend Development Server
```bash
cd react-app
npm run dev
```
The frontend will be available at http://localhost:5173

## 🏗️ Project Structure

```
Quran-Verse-Scout/
├── Backend/
│   └── Bert/
│       └── main.py
├── react-app/
│   ├── src/
│   └── package.json
├── requirements.txt
└── requirements_conda.txt
```

## 💡 How It Works

### Semantic Search
The application uses BERT-based semantic search to understand the context of your query and match it with the most relevant verses from the Quran. This allows users to find verses even when they don't know the exact words or location.

### RAG-Based Summarization
The Surah summarizer uses Retrieval-Augmented Generation (RAG) technology to create accurate summaries by:
1. Retrieving relevant verses from the Surah
2. Generating summaries based solely on the actual content
3. Ensuring no hallucination or incorrect information is included


## 🤝 Contributors  

The amazing contributors who made this project possible:  

| Name                      | GitHub Profile                           | LinkedIn Profile                                                   |
|---------------------------|-------------------------------------------|---------------------------------------------------------------------|
| **Anas Tahir**            | <a href="https://github.com/ANAS-TAAHIR"><img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" /></a> |<a href="https://www.linkedin.com/in/anas-waleed-tahir-9a5b78214"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" /></a> |
| **Muhammad Abdullah Ghazi** | <a href="https://github.com/abdullahdotnet"><img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" /></a> | <a href="https://www.linkedin.com/in/abdullahdotnet20/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" /></a> |
| **Muhammad Zubair**       | <a href="https://github.com/zubayr-ahmad"><img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" /></a> | <a href="https://www.linkedin.com/in/zubayr-ahmad/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" /></a> |  

### ✨ Join Our Mission

We welcome contributions from developers, Islamic scholars, and anyone passionate about making the Quran more accessible through technology. Whether it's improving the search algorithm, enhancing the UI, or adding new features, your contribution can help millions connect better with the Holy Quran.

To contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change. Let's work together to make this tool even more beneficial for the Ummah! 🌟

## 📝 License

This project is licensed under the MIT License.
Enjoy exploring and connecting with the Quran! 😊

## ⚠️ Disclaimer

This tool is designed to assist in Quranic research and study. Users should always verify verses and meanings with authenticated sources and scholars.
