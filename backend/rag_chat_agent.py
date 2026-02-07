import openai
from .vector_db import VectorDB, EmbeddingGenerator

class RAGChatAgent:
    def __init__(self, model="gpt-4o"):
        self.model = model
        self.api_key = EmbeddingGenerator().api_key
        self.vector_db = VectorDB()
        self.embedder = EmbeddingGenerator()

    def answer_query(self, query):
        query_embedding = self.embedder.get_embedding(query)
        relevant_chunks = self.vector_db.search_similar(query_embedding, top_k=5)
        context = "\n\n".join([chunk[1] for chunk in relevant_chunks])
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a codebase expert. Use the provided context to answer the user's question."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}
            ],
            api_key=self.api_key
        )
        return response.choices[0].message["content"]

# Example usage:
# agent = RAGChatAgent()
# answer = agent.answer_query("Where is the payment validation logic?")
# print(answer)
