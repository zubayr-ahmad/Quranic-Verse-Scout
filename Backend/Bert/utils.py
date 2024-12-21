from typing import List
import math

def estimate_tokens(text: str) -> int:
    """Estimate number of tokens in text (roughly 4 characters per token)"""
    return len(text) // 4

def chunk_text(records: List[tuple], chunk_size: int = 5000) -> List[str]:
    """Split records into chunks that won't exceed token limits"""
    chunks = []
    current_chunk = []
    current_length = 0
    
    for record in records:
        text = str(record[0])  # Accessing first element of the tuple
        text_tokens = estimate_tokens(text)
        
        if current_length + text_tokens > chunk_size:
            # Join current chunk and add to chunks
            chunks.append("\n".join(current_chunk))
            current_chunk = [text]
            current_length = text_tokens
        else:
            current_chunk.append(text)
            current_length += text_tokens
    
    # Add the last chunk if it exists
    if current_chunk:
        chunks.append("\n".join(current_chunk))
    
    return chunks

def summarize_chunk(client, chunk: str, surah_name: str, is_final: bool = True) -> str:
    """Summarize a single chunk of text"""
    system_prompt = f"You are summarizing {surah_name}. Create a focused summary that naturally incorporates the surah's themes and teachings. Avoid generic religious terminology and focus on the specific content of these ayahs."
    
    if is_final:
        user_prompt = f"Summarize these ayahs from {surah_name}, focusing on their key messages, stories, and guidance. Create a flowing narrative that captures the essence of these verses:"
    else:
        user_prompt = f"Summarize this section of {surah_name}, focusing on the specific teachings and themes present in these particular ayahs:"
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": f"{user_prompt}\n{chunk}"
            }
        ],
        model="llama3-8b-8192",
        stream=False,
        temperature=0.1,
    )
    return chat_completion.choices[0].message.content.strip()

def combine_summaries(client, surah_name: str, summaries: List[str]) -> str:
    """Combine multiple summaries into a final summary"""
    combined_text = "\n\n".join(summaries)
    
    system_prompt = f"You are creating a unified summary of {surah_name}. Weave together the major themes, stories, and teachings into a coherent narrative that reflects the surah's unique character and message."
    
    user_prompt = (
        f"Create a comprehensive, flowing summary of {surah_name} from these section summaries. "
        "Eliminate redundancy and create a natural progression of ideas. "
        "Focus on the key messages, stories, and guidance while maintaining their interconnections:"
    )
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": f"{user_prompt}\n\n{combined_text}"
            }
        ],
        model="llama3-8b-8192",
        stream=False,
        temperature=0.05
    )
    return chat_completion.choices[0].message.content.strip()