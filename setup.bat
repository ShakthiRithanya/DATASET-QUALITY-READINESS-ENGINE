@echo off
echo Initializing DQRE Local Environment...

:: Create venv
python -m venv venv
call venv\Scripts\activate

:: Install backend deps
cd backend
pip install -r requirements.txt
cd ..

:: Install frontend deps
cd frontend
npm install
cd ..

echo ------------------------------------------------
echo Setup Complete.
echo To run backend: cd backend ^& python run.py
echo To run frontend: cd frontend ^& npm run dev
echo ------------------------------------------------
pause
