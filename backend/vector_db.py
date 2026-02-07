import os
import psycopg2
import openai
import numpy as np

PGVECTOR_DIM = 1536  # OpenAI embedding size (adjust if using other models)

class VectorDB:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB", "livingdocs"),
            user=os.getenv("POSTGRES_USER", "postgres"),
            password=os.getenv("POSTGRES_PASSWORD", "postgres"),
            host=os.getenv("POSTGRES_HOST", "localhost"),
            port=os.getenv("POSTGRES_PORT", "5432")
        )
        self.create_table()

    def create_table(self):
        with self.conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS code_embeddings (
                    id SERIAL PRIMARY KEY,
                    file_path TEXT,
                    code_chunk TEXT,
                    embedding VECTOR(%s)
                )
            """, (PGVECTOR_DIM,))
            self.conn.commit()

    def insert_embedding(self, file_path, code_chunk, embedding):
        with self.conn.cursor() as cur:
            cur.execute(
                "INSERT INTO code_embeddings (file_path, code_chunk, embedding) VALUES (%s, %s, %s)",
                (file_path, code_chunk, np.array(embedding))
            )
            self.conn.commit()

    def search_similar(self, query_embedding, top_k=5):
        with self.conn.cursor() as cur:
            cur.execute(
                "SELECT file_path, code_chunk FROM code_embeddings ORDER BY embedding <-> %s LIMIT %s",
                (np.array(query_embedding), top_k)
            )
            return cur.fetchall()

class EmbeddingGenerator:
    def __init__(self, model="text-embedding-3-small"):
        self.model = model
        self.api_key = os.getenv("OPENAI_API_KEY")

    def get_embedding(self, text):
        response = openai.Embedding.create(
            model=self.model,
            input=text,
            api_key=self.api_key
        )
        return response["data"][0]["embedding"]

# Example usage:
# db = VectorDB()
# embedder = EmbeddingGenerator()
# embedding = embedder.get_embedding("def foo(): pass")
# db.insert_embedding("foo.py", "def foo(): pass", embedding)
