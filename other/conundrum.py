import json
import random
import datetime
with open('words.json', "r") as f:
    words = json.load(f)

options = [
    [2, 2, 5],
    [2, 3, 4],
    [2, 7],
    [3, 3, 3],
    [3, 6],
    [4, 5]
]
def get_word():
    try:
        pick = random.choice(options)
        word_list = []
        for i in pick:
            word_list.append(random.choice(words[f'{i}-letter']))

        word = "".join(word_list)
        for i in words['9-letter']:
            if sorted(word) == sorted(i):
                print(i, word, word_list)
                return i, word, word_list

        return get_word()
    except RecursionError:
        return "ERROR"
start_date = datetime.date(2024, 1, 1)
end_date = datetime.date(2025, 1, 1)
delta = datetime.timedelta(days=1)

words_output = {}
while start_date < end_date:
    d = start_date.strftime("%Y-%m-%d")
    random.seed(d)

    words_output[d] = get_word()
    start_date += delta

print(words_output)
