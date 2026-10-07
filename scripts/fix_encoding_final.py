import glob

files = glob.glob('c:/Users/virei/OneDrive/Documentos/Games/AMA/**/*.js', recursive=True) + glob.glob('c:/Users/virei/OneDrive/Documentos/Games/AMA/**/*.html', recursive=True)
reps = {'Ã gua': 'Água', 'â­ ': '⭐', 'ðŸ †': '🏆', 'ðŸ“š': '📚', 'ðŸŒ±': '🌱', 'ðŸŽ‰': '🎉', 'â˜†': '☆'}

for f in files:
    if 'node_modules' not in f and 'dist' not in f:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            for k, v in reps.items():
                content = content.replace(k, v)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
        except Exception as e:
            pass
