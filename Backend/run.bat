@echo off
echo ========================================================
echo Iniciando Backend FastAPI com Banco SQLite da Alinhava
echo ========================================================
cd /d "%~dp0"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
