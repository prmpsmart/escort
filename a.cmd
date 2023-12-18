@echo off
ts-node src/swagger.ts && npm run build && npm run start
