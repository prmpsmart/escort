import os

src_path = 'src'
# os.makedirs(src_path)

# Create subdirectories
subdirectories = ['controllers', 'models', 'routes', 'services', 'middleware', 'config', 'utils']
for subdirectory in subdirectories:
    os.makedirs(os.path.join(src_path, subdirectory))

# Create app file
with open(os.path.join(src_path, 'app.py'), 'w') as app_file:
    app_file.write('# Your main application logic goes here')
