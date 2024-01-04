import os
while 1:
    print('Launching')
    try:
        os.system('ts-node src/app.ts')
    except KeyboardInterrupt:
        ...