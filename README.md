# React + TypeScript + Vite & Node.js Backend

โปรเจกต์นี้เป็นระบบเว็บแอปพลิเคชัน แบ่งออกเป็น 2 ส่วนหลัก

- **Frontend** : React + TypeScript + Vite  
- **Backend** : Node.js + Express + MySQL  

---

## โครงสร้างโปรเจกต์

```text
project-root/
├─ frontend/
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  ├─ vite.config.ts
│  └─ tsconfig.json
│
├─ backend/
│  ├─ src/
│  ├─ package.json
│  └─ .env
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

```text
Database Classroom
├─ users - เอาไว้เก็บ user เพื่อ login เข้าสู่ระบบ
│  ├─ id(Auto_increment / เพิ่มเองจากระบบ)
│  ├─ user_id(Varchar/String) รหัสผู้ใช้ (เก็บไว้เฉยๆ เอาไว้ where หาเมื่อ query)
│  ├─ user_name(Varchar/String) ชื่อผู้ใช้เพื่อใช้ login
│  ├─ user_password(VARCHAR) เก็บ password hash ด้วย bcrypt
│  ├─ role_flg(INT) แสดงระดับของผู้ใช้ 0 = admin 1 = คุณครู 2 = student 3 = คนปกติ  
│  ├─ deleted_flg(DATETIME) เก็บไว้เพื่อบอกสถานะว่า user นี้ถูก ลบหรือไม่
│  ├─ last_login(DATETIME) เก็บไว้เพื่อบอกวันที่เข้าสู่ระบบล่าสุด
│  ├─ created_datetime(TIMESTAMP) วันที่สร้าง
│  └─ update_datetime(TIMESTAMP) วันที่โดนลบ
│
├─ ref_number - เอาไว้เก็บ format (รูปแบบ) ของระบบที่จะเอาไปใช้ ปัจจุบันเอาไปใช้แค่เก็บ user_id จะได้เรียงสวย ๆ
│  ├─ name(Varchar/String) ชื่อ
│  ├─ prefix(Varchar/String) รูปแบบที่จะดึงไปใช้
│  ├─ current_value(INT) ลำดับตัวเลขที่จะเอาไปใช้ต่อ
│  └─pad_lenght(INT) เก็บความยาวของตัวที่จะเอาไปแสดง (ไม่ต้องมีก็ได้แต่มีไว้เผื่อรองรับ)
│
├─ classes - เก็บรายวิชา
│  ├─ id(Auto_increment / เพิ่มเองจากระบบ)
│  ├─ class_id(Varchar/String) รหัสรายวิชา
│  ├─ class_name(Varchar/String) ชื่อรายวิชา
│  ├─ class_describe(VARCHAR) รายละเอียดวิชา
│  ├─ deleted_flg(INT) เก็บไว้เพื่อบอกสถานะว่า user นี้ถูก ลบหรือไม่
│  ├─ deleted_by(VARCHAR) user ที่ลบ
│  ├─ created_by(VARCHAR) user ที่สร้าง
│  └─ created_datetime(TIMESTAMP) วันที่สร้าง
│
├─ class_user - เก็บuser ที่เห็น class
│  ├─ class_id(Varchar/String) รหัสรายวิชา
│  ├─ user_id(Varchar/String) รหัสผู้ใช้
│  ├─ role_flg(INT) แสดงระดับของผู้ใช้ 0 = admin 1 = คุณครู 2 = student 3 = คนปกติ (ที่จริงไม่ต้องเก็บก็ได้ แต่เผื่อมีหน้า display ในอนาคต)
│  ├─ view_flg(INT) 0 = เห็น 1 = ไม่เห็น //เก็บไว้เผื่อuserเดิมเคยถูกลบออก
│  ├─ deleted_flg(INT) เก็บไว้เพื่อบอกสถานะว่า user นี้ถูก ลบหรือไม่
│  ├─ deleted_by(VARCHAR) user ที่ลบ
│  ├─ created_datetime(TIMESTAMP) วันที่สร้าง
│  └─ updated_datetime(TIMESTAMP) วันที่แก้ไข
│
├─ class_assignment - ผลงานในรายวิชา
│  ├─ assignment_id(Auto_increment / เพิ่มเองจากระบบ) เก็บไว้เพื่อ where หาและแยกเพื่อไม่ข้อมูลปน
│  ├─ class_id(Varchar/String) เอาไว้เชื่อมกับรหัสรายวิชา
│  ├─ assignment_type(Varchar/String) ประเภทผลงาน
│  ├─ assignment_name(Varchar/String) ชื่อผลงาน
│  ├─ assignment_detail(Varchar/String) รายละเอียดผลงาน
│  ├─ assignment_link(Varchar/String) ลิ้งแนบ
│  ├─ deleted_flg(INT) เก็บไว้เพื่อบอกสถานะว่า user นี้ถูก ลบหรือไม่
│  ├─ created_by(VARCHAR) user ที่สร้าง
│  ├─ deleted_by(VARCHAR) user ที่ลบ
│  ├─ created_datetime(TIMESTAMP) วันที่สร้าง
│  └─ updated_datetime(TIMESTAMP) วันที่แก้ไข
│
└─  assignment_files - ไฟล์แนบกับผลงาน
   ├─ file_id(Auto_increment / เพิ่มเองจากระบบ) เก็บไว้เพื่อ where หาและแยกเพื่อไม่ข้อมูลปน
   ├─ assignment_id(Varchar/String) เอาไว้เชื่อมกับรหัสผลงาน
   ├─ file_name(Varchar/String) ชื่อไฟล์
   ├─ file_path(Varchar/String) เก็บที่อยู่ (Path) ของไฟล์ในระบบ
   ├─ file_size(BIGINT) ขนาดไฟล์ ใช้ BIGINTเพราะขนาดไฟล์ใหญ่เกินกว่าที่ INTจะเก็บได้
   ├─ deleted_flg(INT) เก็บไว้เพื่อบอกสถานะว่า user นี้ถูก ลบหรือไม่
   └─ created_datetime(TIMESTAMP) วันที่สร้าง



📁 layouts
🔹 MainLayout.tsx

โครงสร้างหลักของแอป เช่น
-Sidebar 
ทุกหน้าภายในระบบ (หลัง login) จะถูก wrap ด้วย layout นี้

📁 pages
🏠 หน้าทั่วไป
🔹 Home.tsx หน้า Dashboard / หน้าแรกหลัง login แสดงภาพรวม เช่น จำนวน class, จำนวน assignment, สถานะต่าง ๆ
🔹 Login.tsx หน้าเข้าสู่ระบบ
🔹 Register.tsx หน้าสมัครสมาชิก
🔹 UserManagement.tsx หน้าจัดการผู้ใช้ทั้งหมด (สำหรับ admin) ดูรายชื่อ user, แก้ไขสิทธิ์, ลบ user

📁 pages/assignment
เกี่ยวกับงาน (Assignment)
🔹 AssignmentDetail.tsx แสดงรายละเอียด assignment เช่น ชื่องาน, คำอธิบาย, ไฟล์แนบ
🔹 AssignmentEdit.tsx หน้าแก้ไข assignment เปลี่ยนชื่อ, แก้คำอธิบาย, แก้ไฟล์แนบ
🔹 AssignmentManagement.tsx หน้ารวมรายการ assignment ทั้งหมดของ user นั้นเป็นตาราง list และปุ่มแก้ไข / ลบ
🔹 CreateAssignment.tsx หน้าสร้าง assignment ใหม่

📁 pages/class
เกี่ยวกับห้องเรียน (Class)
🔹 ClassDetail.tsx ชื่อวิชา, คำอธิบาย และ assignment ภายใน class 
🔹 ClassEdit.tsx หน้าแก้ไขข้อมูล class,แก้class_id เปลี่ยนชื่อ และแก้รายละเอียด
🔹 ClassUserManagement.tsx จัดการสมาชิกใน class เพิ่มนักเรียนและลบนักเรียน
🔹 CreateClass.tsx หน้าสร้าง class ใหม่
🔹 TeacherClassManagement.tsx หน้าที่ครูและแอดมินเห็นเป็นหน้าที่ครูและแอดมินจะเห็น class ที่ตัวเองสอน list class ของ teacher คนนั้น และเข้าไปจัดการ assignment ได้

📁 services
ส่วนติดต่อ API backend
🔹 assignment.service.ts ฟังก์ชันเรียก API เกี่ยวกับ assignmen
getAssignmentByUser() เรียก assginment ที่userนั้นเห็น
getAssignmentByClass() เรียก assginment ทั้งหมดค้นหาด้วย class
getAssignmentDetail() เรียกข้อมูลผลงานเช่นชื่อ รายละเอียด หรือไฟล์แนบ
downloadAssignmentFile() download ไฟล์
createAssignment() สร้าง Assignment ใหม่
updateAssignment() แก้ไข Assignment
deleteAssignment() ลบ Assignment

🔹 auth.service.ts
จัดการ login / register / token แต่ปัจจุบันยังไมไ่ด้เอา loginและ register ไปวางเพราะมาทำ service ตอนหลังๆ

🔹 class.service.ts เรียก API เกี่ยวกับ class
createClass() สร้าง class
fetchClasses() ค้นหา class / เรียกclassทั้งหมดที่ user เห็นครั้งแรกหลัง login
fetchClassDetail() เรียก class และ assignemnt ทั้งหมดเมื่อกดเข้า class
updateClass() แก้ไข class
getClassesByUser()เรียก class ที่มีผลงานนั้นของ user นั้นๆอยู่
getTeacherClasses()เรียก class ที่ teacherดูแล
deleteClass() ลบ/ปิดการใช้งาน class

🔹 classUserService.ts จัดการความสัมพันธ์ user กับ class
fetchClasses() เรียก class ทั้งหมดที่ user teacher/admin อยู่เพื่อเพิ่มuserเข้า class
fetchClassUsers() เรียกuserทั้งหมดที่อยู่ในclass นั้น
addClassUser() เพื่ม userเข้า class
removeClassUser() ลบ user ออกจากclass


🔹 user.service.ts เรียก API user เช่น 
fetchUsers() เรียก user ทั้งหมด
updateUserRole() แก้ไข user role 
updateUserActive() เปิดใช้ user
fetchAvailableUsers() เรียก user ที่สามารถเพิ่มได้ในคลาส