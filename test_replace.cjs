const text = "abc </body> def";
const replacement = "SCRIPT_WITH_$'";
console.log(text.replace('</body>', replacement));
