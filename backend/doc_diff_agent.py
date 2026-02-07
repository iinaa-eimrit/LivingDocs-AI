import difflib
import openai
import os

class DocDiffAgent:
    def __init__(self, model="gpt-4o"):
        self.model = model
        self.api_key = os.getenv("OPENAI_API_KEY")

    def generate_doc(self, code):
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an expert documentation generator."},
                {"role": "user", "content": f"Generate documentation for this code:\n{code}"}
            ],
            api_key=self.api_key
        )
        return response.choices[0].message["content"]

    def diff_docs(self, old_doc, new_doc):
        diff = difflib.unified_diff(
            old_doc.splitlines(),
            new_doc.splitlines(),
            fromfile="Old Documentation",
            tofile="New Documentation",
            lineterm=""
        )
        return "\n".join(diff)

# Example usage:
# agent = DocDiffAgent()
# old_doc = open("README.md").read()
# new_doc = agent.generate_doc(code)
# diff = agent.diff_docs(old_doc, new_doc)
