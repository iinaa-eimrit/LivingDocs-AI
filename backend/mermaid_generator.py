import ast

class MermaidGenerator:
    def __init__(self):
        pass

    def generate_flowchart(self, ast_tree):
        nodes = []
        edges = []
        for node in ast.walk(ast_tree):
            if isinstance(node, ast.FunctionDef):
                nodes.append(node.name)
                for child in ast.walk(node):
                    if isinstance(child, ast.Call) and isinstance(child.func, ast.Name):
                        edges.append((node.name, child.func.id))
        mermaid = ["graph TD"]
        for n in nodes:
            mermaid.append(f"    {n}(( {n} ))")
        for src, dst in edges:
            mermaid.append(f"    {src} --> {dst}")
        return "\n".join(mermaid)

# Example usage:
# import ast
# code = open("example.py").read()
# tree = ast.parse(code)
# generator = MermaidGenerator()
# diagram = generator.generate_flowchart(tree)
# print(diagram)
