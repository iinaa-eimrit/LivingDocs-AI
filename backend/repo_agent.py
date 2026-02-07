import os
import subprocess
import tempfile
import shutil
import ast

class RepoAgent:
    def __init__(self, repo_url, branch="main"):
        self.repo_url = repo_url
        self.branch = branch
        self.clone_dir = None

    def clone_repo(self):
        self.clone_dir = tempfile.mkdtemp()
        try:
            subprocess.check_call([
                "git", "clone", "--branch", self.branch, self.repo_url, self.clone_dir
            ])
            return True
        except Exception as e:
            print(f"Error cloning repo: {e}")
            return False

    def parse_python_files(self):
        from backend.tree_sitter_parser import TreeSitterParser
        parser = TreeSitterParser()
        ast_results = {}
        for root, _, files in os.walk(self.clone_dir):
            for file in files:
                if file.endswith(".py"):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            code = f.read()
                        tree = parser.parse_code(code)
                        ast_results[file_path] = tree
                    except Exception as e:
                        print(f"Error parsing {file_path}: {e}")
        return ast_results

    def cleanup(self):
        if self.clone_dir:
            shutil.rmtree(self.clone_dir)

# Example usage:
# agent = RepoAgent("https://github.com/your/repo.git")
# if agent.clone_repo():
#     asts = agent.parse_python_files()
#     agent.cleanup()
