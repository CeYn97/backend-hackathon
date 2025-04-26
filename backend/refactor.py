import csv
import random

def main(input_file='users.csv', output_file='users2.csv'):
    dev_groups = {
        'frontend': ['html', 'css', 'js', 'ts', 'react', 'vue', 'angular'],
        'backend': ['python', 'node', 'go', 'php', 'ruby'],
        'desktop': ['csharp', 'java', 'cpp', 'python', 'electron'],
        'mobile': ['swift', 'kotlin', 'react-native', 'flutter']
    }

    with open(input_file, newline='', encoding='utf-8') as csvfile_in, \
         open(output_file, 'w', newline='', encoding='utf-8') as csvfile_out:

        reader = csv.reader(csvfile_in, delimiter=';')
        writer = csv.writer(csvfile_out, delimiter=';')

        header = next(reader)
        new_columns = ['group', 'langs', 'proficiency']
        writer.writerow(header + new_columns)

        for row in reader:
            group = random.choice(list(dev_groups.keys()))
            langs_list = dev_groups[group]

            if group == 'frontend':
                mandatory = ['html', 'css']
                others = [lang for lang in langs_list if lang not in mandatory]
                count = random.randint(0, min(2, len(others)))
                chosen = mandatory + random.sample(others, count)
            else:
                count = random.randint(1, min(4, len(langs_list)))
                chosen = random.sample(langs_list, count)

            langs_str = ' '.join(chosen)
            proficiency = random.randint(1, 100)

            writer.writerow(row + [group, langs_str, f'{proficiency}%'])

    print(f"Done: {output_file}")

if __name__ == '__main__':
    main()
