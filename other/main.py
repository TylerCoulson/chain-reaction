import json
with open('words/dictionary.json', "r") as f:
    words = json.load(f)
    _9 = words["9-letter"]

new_list = set()
for i in _9:

    sort = "".join(sorted(i))
    new_list.add(sort)

output = {}
for w in new_list:
    output[w] = []
    for k in _9:
        if "".join(sorted(k)) == w:
            output[w].append(k) 

with open('words/output.json', "w") as f:
    json.dump(output, f)

print(output)