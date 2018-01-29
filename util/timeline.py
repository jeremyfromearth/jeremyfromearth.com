import os
import json
import yaml

collection = []
for root, subdir, files in os.walk('./_work/'):
  if root is not './_work/':
    projects = []
    year = root.split('/')[2]
    record = {
        'year': year, 
        'projects': projects
      }
    collection.append(record)
    for fname in files:
      if fname.endswith('md'):
        s =  ''
        started = False
        str_id = fname.split('.')[0]
        with open('/'.join([root, fname])) as data:
          for line in data:
            if line.strip() == '---':
              if not started:
                started = True
                continue
              else:
                break

            s += line
          y = yaml.load(s)
          y['id'] = str_id
          y['link'] = '/work/' + year + '/' + fname.split('.')[0]
          projects.append(y)

with open('./util/work-timeline.json', 'w') as f:
  json.dump(collection, f, indent=2)

