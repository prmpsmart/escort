import os
while 1:
    print('\nLaunching')
    try:
        os.system('ts-node src/app.ts')
    except KeyboardInterrupt:
        ...