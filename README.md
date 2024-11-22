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
- [Anas Tahir](https://github.com/ANAS-TAAHIR), [LinkedIn](https://www.linkedin.com/in/anas-waleed-tahir-9a5b78214)
- [Muhammad Abdullah Ghazi](https://github.com/abdullahdotnet), [LinkedIn](https://www.linkedin.com/in/abdullahdotnet20/)
- [Muhammad Zubair](https://github.com/zubayr-ahmad), [LinkedIn](https://www.linkedin.com/in/zubayr-ahmad/)

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
Enjoy exploring and connecting with the Quran! 😊

## ⚠️ Disclaimer

This tool is designed to assist in Quranic research and study. Users should always verify verses and meanings with authenticated sources and scholars.