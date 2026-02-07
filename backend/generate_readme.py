import openai
import ast
import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def read_python_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            code = f.read()
        tree = ast.parse(code)
        return code, tree
    except Exception as e:
        print(f"Error reading/parsing file: {e}")
        return None, None

def generate_readme(code, model="gpt-4o", api_key=None):
    if not api_key:
        api_key = OPENAI_API_KEY
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are an expert documentation generator."},
                {"role": "user", "content": f"Analyze this Python code and generate a README.md: \n{code}"}
            ],
            api_key=api_key
        )
        return response.choices[0].message["content"]
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return None

def main():
    import sys
    import argparse
    parser = argparse.ArgumentParser(description="Generate README.md from Python file using GPT-4o")
    parser.add_argument("python_file", help="Path to the Python file")
    parser.add_argument("--output", default="README.generated.md", help="Output README file path")
    parser.add_argument("--model", default="gpt-4o", help="OpenAI model to use")
    args = parser.parse_args()

    code, tree = read_python_file(args.python_file)
    if not code:
        print("Failed to read or parse Python file.")
        sys.exit(1)
    readme = generate_readme(code, model=args.model)
    if not readme:
        print("Failed to generate README.")
        sys.exit(1)
    try:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(readme)
        print(f"{args.output} created.")
    except Exception as e:
        print(f"Error writing README: {e}")

if __name__ == "__main__":
    main()
