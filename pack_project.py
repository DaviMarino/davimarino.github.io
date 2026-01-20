import os

# Configurações
OUTPUT_FILE = "projeto_completo.md"
IGNORE_DIRS = {'node_modules', '.git', 'dist', 'build', '.vscode', '__pycache__'}
IGNORE_FILES = {'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', OUTPUT_FILE, 'readme.md'}
ALLOWED_EXTENSIONS = {
    '.js', '.jsx', '.ts', '.tsx',  # React/JS
    '.css', '.scss', '.html',      # Estilos/Markups
    '.json', '.md',                # Configs/Docs
    '.py', '.sh'                   # Scripts auxiliares
}

def is_text_file(filename):
    return any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS)

def pack_project():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        # Caminha pela árvore de diretórios
        for root, dirs, files in os.walk('.'):
            # Modifica a lista 'dirs' in-place para pular pastas ignoradas
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if file.lower() in IGNORE_FILES or not is_text_file(file):
                    continue
                
                filepath = os.path.join(root, file)
                
                # Cabeçalho do arquivo no Markdown
                outfile.write(f"# ARQUIVO: {filepath}\n")
                
                # Detecta extensão para syntax highlighting
                ext = filepath.split('.')[-1]
                if ext == 'js' or ext == 'jsx': lang = 'javascript'
                elif ext == 'ts' or ext == 'tsx': lang = 'typescript'
                else: lang = ext
                
                outfile.write(f"```{lang}\n")
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"// Erro ao ler arquivo: {e}")
                
                outfile.write("\n```\n\n")
                print(f"Processado: {filepath}")

if __name__ == "__main__":
    pack_project()
    print(f"\nConcluído! Envie o arquivo '{OUTPUT_FILE}'.")