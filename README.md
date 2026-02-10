# React + TypeScript + Vite & Node.js Backend

โปรเจกต์นี้เป็นระบบเว็บแอปพลิเคชัน แบ่งออกเป็น 2 ส่วนหลัก

- **Frontend** : React + TypeScript + Vite  
- **Backend** : Node.js + Express + MySQL  

---

## โครงสร้างโปรเจกต์

project-root/
├─ frontend/
│ ├─ src/
│ ├─ public/
│ ├─ package.json
│ └─ vite.config.ts
│
├─ backend/
│ ├─ src/
│ ├─ package.json
│ ├─ .env
│ └─ tsconfig.json
│
└─ README.md

## สิ่งที่ต้องมีในเครื่อง (Prerequisites)

- **Node.js** (แนะนำเวอร์ชัน LTS)
- **npm**
- **MySQL**

ตรวจสอบเวอร์ชัน:
```bash
node -v
npm -v

วิธีติดตั้งโปรเจกต์
git clone <repository-url>
cd <project-root>

## Frontend (React + TypeScript + Vite)
เข้าโฟลเดอร์ frontend
-cd fronted
-npm install
-npm run dev
-npm install react react-dom react-router-dom react-toastify

#เปิดเว็ป
👉 http://localhost:5173
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.12.0",
  "react-toastify": "^11.0.5"
}
ื
##Backend (Node.js + Express)
-cd backend
-npm install
-npm install express mysql2 multer bcryptjs jsonwebtoken cors dotenv

แก้DBในไฟล์ backend/src/db.ts
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=your_database_name

สร้างไฟล์ .env
JWT_SECRET=your_secret_key

แก้ไขPortได้ที่
backend/src/index.ts

-npm run dev