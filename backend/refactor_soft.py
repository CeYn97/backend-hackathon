import csv
import random

soft_skills = [
    "Адаптивность",
    "Настойчивость",
    "Активность",
    "Коммуникабельность",
    "Ответственность",
    "Организованность",
    "Креативность",
    "Самодисциплина",
    "Эмпатия",
    "Самосовершенствование",
    "Эмоциональный интеллект",
    "Самоорганизация",
    "Клиентоориентированность",
]

def main(input_file='users2.csv', output_file='users3.csv'):
    with open(input_file, newline='', encoding='utf-8') as fin, \
         open(output_file, 'w', newline='', encoding='utf-8') as fout:

        reader = csv.reader(fin, delimiter=';')
        writer = csv.writer(fout, delimiter=';')

        header = next(reader)
        writer.writerow(header + ['soft_skills'])

        for row in reader:
            count = random.randint(1, 4)
            chosen = random.sample(soft_skills, count)
            skills_str = ', '.join(chosen)

            writer.writerow(row + [skills_str])

    print(f"Done: {output_file}")

if __name__ == '__main__':
    main()
