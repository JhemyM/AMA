import sys

def fix_mojibake(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        replacements = {
            "Ã¡": "á",
            "Ã¢": "â",
            "Ã£": "ã",
            "Ã§": "ç",
            "Ã©": "é",
            "Ãª": "ê",
            "Ã­": "í",
            "Ã³": "ó",
            "Ã´": "ô",
            "Ãµ": "õ",
            "Ãº": "ú",
            "Ã ": "à",
            "Ã ": "Á", # C3 81
            "Ãƒ": "Ã", 
            "Ã‡": "Ç",
            "Ã‰": "É",
            "ÃŠ": "Ê",
            "Ã“": "Ó",
            "Ã”": "Ô",
            "Ã•": "Õ",
            "Ãš": "Ú",
            "Ã±": "ñ",
            "ðŸ †": "🏆",
            "â­ ": "⭐",
            "ðŸ“š": "📚",
            "ðŸŒ±": "🌱",
            "ðŸŽ‰": "🎉",
            "â˜†": "☆"
        }
        
        # We need to be careful with things like "Ã " if it has a space.
        # Actually "Ã " (C3 81) is often shown as "Ã " (A tilde followed by invisible control character)
        # Let's replace using the exact bytes representation decoded as utf-8:
        
        bytes_replacements = {
            b'\xc3\xa1': "á",
            b'\xc3\xa2': "â",
            b'\xc3\xa3': "ã",
            b'\xc3\xa7': "ç",
            b'\xc3\xa9': "é",
            b'\xc3\xaa': "ê",
            b'\xc3\xad': "í",
            b'\xc3\xb3': "ó",
            b'\xc3\xb4': "ô",
            b'\xc3\xb5': "õ",
            b'\xc3\xba': "ú",
            b'\xc3\xa0': "à",
            b'\xc3\x81': "Á",
            b'\xc3\x80': "À",
            b'\xc3\x87': "Ç",
            b'\xc3\x89': "É",
            b'\xc3\x8a': "Ê",
            b'\xc3\x93': "Ó",
            b'\xc3\x94': "Ô",
            b'\xc3\x95': "Õ",
            b'\xc3\x9a': "Ú",
            b'\xc3\xb1': "ñ"
        }
        
        emoji_replacements = {
            b'\xf0\x9f\x8f\x86': "🏆",
            b'\xe2\xad\x90': "⭐",
            b'\xf0\x9f\x93\x9a': "📚",
            b'\xf0\x9f\x8c\xb1': "🌱",
            b'\xf0\x9f\x8e\x89': "🎉",
            b'\xe2\x98\x86': "☆"
        }

        # Instead of doing it as bytes, I can just do string replacements for the weird utf-8 strings
        for k, v in replacements.items():
            content = content.replace(k, v)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed mojibake string replacements in {filepath}")
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

if __name__ == '__main__':
    import glob
    files = glob.glob('c:/Users/virei/OneDrive/Documentos/Games/AMA/**/*.js', recursive=True) + glob.glob('c:/Users/virei/OneDrive/Documentos/Games/AMA/**/*.html', recursive=True)
    for f in files:
        if 'node_modules' not in f and 'dist' not in f:
            fix_mojibake(f)
