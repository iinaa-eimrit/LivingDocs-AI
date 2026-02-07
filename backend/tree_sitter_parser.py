from tree_sitter import Language, Parser
import os

# Build the language library if not already built
LIB_PATH = os.path.join(os.path.dirname(__file__), "tree_sitter_languages.so")
if not os.path.exists(LIB_PATH):
    Language.build_library(
        # Store the library in the backend directory
        LIB_PATH,
        [
            os.path.join(os.path.dirname(__file__), "tree-sitter-python")
        ]
    )

PY_LANGUAGE = Language(LIB_PATH, "python")

class TreeSitterParser:
    def __init__(self):
        self.parser = Parser()
        self.parser.set_language(PY_LANGUAGE)

    def parse_code(self, code: str):
        tree = self.parser.parse(bytes(code, "utf8"))
        return tree

def parse_python_ast(code: str):
    parser = TreeSitterParser()
    tree = parser.parse_code(code)
    return tree.root_node.sexp()

# Example usage:
# parser = TreeSitterParser()
# tree = parser.parse_code("def foo():\n    return 42")
# print(tree.root_node.sexp())
