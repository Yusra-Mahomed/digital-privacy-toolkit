# 🛡️ Educational Digital Privacy Toolkit

This project is an interactive, educational toolkit designed to help users understand, detect, and defend against modern online tracking techniques  through a hands-on web application and visual infographics.

---

## ⚙️ Getting Started

### 1️⃣ Backend (FastAPI)

**Requirements:**
- Python 3.9+
- `virtualenv` or `venv`

**Setup Instructions:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   
pip install -r requirements.txt
```

**Run FastAPI Server:**

```bash
uvicorn app.main:app --reload
```


---

### 2️⃣ Frontend (React + Vite)

**Requirements:**
- Node.js (v16+ recommended)
- npm

**Setup Instructions:**

```bash
cd frontend
npm install
npm run dev
```

NOTE:

Environment Variables:
Create a .env file inside the frontend folder:

For local development:
```VITE_API_URL=http://localhost:8000```

This connects your frontend to your local FastAPI backend.

For production
```VITE_API_URL=https://digital-privacy-toolkit-l3ix.onrender.com```

This connects your frontend to the deployed backend.

Run frontend:

npm run dev

Frontend will be available at:
```http://localhost:5173```

---

## 🔗 API Overview

The frontend connects to the backend through REST APIs:

| Module          | Endpoint Path              | Description                                  |
|-----------------|----------------------------|----------------------------------------------|
| Fingerprinting  | `/api/fingerprint`         | Detects fingerprinting and entropy factors   |
| Cookies/Scripts | `/api/tracking`            | Analyzes third-party scripts and cookies     |
| OSINT Search    | `/api/osint/search`        | Builds custom search queries for usernames   |
| Preview Search  | `/api/osint/preview`       | Shows inline search previews via DuckDuckGo  |
| Social Exposure | `/api/social`              | Checks usernames across major platforms      |

---

## 📌 Notes

- Uses [zxcvbn](https://github.com/dropbox/zxcvbn) for password strength analysis.
- Checks breach data using [Have I Been Pwned](https://haveibeenpwned.com/API/v3).
- Cookie & script detection is powered by a headless browser via Playwright.
- All tools prioritise user privacy — no sensitive information is stored.

---


## 📄 License

For educational use only. You may modify or extend this for non-commercial purposes.
