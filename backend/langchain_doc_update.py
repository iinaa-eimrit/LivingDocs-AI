from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI

class DocUpdateChain:
    def __init__(self, model_name="gpt-4o", api_key=None):
        self.llm = ChatOpenAI(model_name=model_name, openai_api_key=api_key)
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Senior Technical Writer. Maintain style and tone."),
            ("user", "Old code:\n{old_code}\nNew code:\n{new_code}\nOld doc:\n{old_doc}\nTask: If logic changed, rewrite doc to match new code.")
        ])

    def run(self, old_code, new_code, old_doc):
        return self.llm(self.prompt.format(old_code=old_code, new_code=new_code, old_doc=old_doc))

# Example usage:
# chain = DocUpdateChain()
# result = chain.run(old_code, new_code, old_doc)
# print(result)
