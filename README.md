# 🏡 StayBnb - Airbnb Clone

🚀 A full-stack **MERN-based Airbnb Clone** where users can browse, book properties, and manage bookings with authentication.

## 🔗 Live Demo
🎯 **Frontend**: [staybnb.vercel.app](https://staybnb.vercel.app)  
🎯 **Backend API**: [stay-bnb-wm93.onrender.com](https://stay-bnb-wm93.onrender.com)  

---

## 🛠 Tech Stack
| Frontend | Backend | Database | Auth | Deployment |
|----------|--------|----------|------|------------|
| React.js (Vite) | Node.js (Express) | MongoDB (Mongoose) | JWT + bcrypt.js | Vercel (Frontend) |
| Tailwind CSS | REST API | Mongoose ODM | Protected Routes | Render (Backend) |

---

## 🚀 Features
✅ Browse & search properties  
✅ View property details  
✅ User authentication (Signup/Login)  
✅ Secure JWT-based login  
✅ Book properties & manage bookings  
✅ Payment form simulation  
✅ Booking history & user dashboard  
✅ Mobile-friendly & responsive design  

---

## 📸 Screenshots
| Home Page | Property Details | Booking Page |
|-----------|-----------------|--------------|
| ![image](https://github.com/user-attachments/assets/85c2ddc2-3eed-44b5-b23e-7275f5d49960) 
 | ![Booking](https://via.placeholder.com/300) |

---

## 🏗 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/staybnb.git
cd staybnb
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- **Create a `.env` file** in the backend folder:
  ```
  PORT=8080
  MONGO_URI=your_mongodb_connection_string
  SECRET_KEY=your_jwt_secret
  ```
- **Start the server**
  ```sh
  npm start
  ```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```
- **Create a `.env` file** in the frontend folder:
  ```
  VITE_API_BASE_URL=https://stay-bnb-wm93.onrender.com
  ```
- **Run the frontend**
  ```sh
  npm run dev
  ```

---

## 🔥 API Endpoints
### 🔹 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login a user |

### 🔹 Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/properties` | Get all properties |
| `GET` | `/api/properties/:id` | Get single property details |
| `GET` | `/api/properties/search?query=` | Search properties |

### 🔹 Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a new booking (Authenticated) |
| `GET` | `/api/bookings/user` | Fetch user-specific bookings |

---

## 🌎 Deployment
### ✅ Frontend on Vercel
1. Run `vercel login`
2. Deploy: `vercel`

### ✅ Backend on Render
1. Push backend code to GitHub
2. Create a Render service for Express
3. Add **environment variables** for `MONGO_URI` & `SECRET_KEY`
4. Deploy backend 🚀

---

## 🤝 Contributing
👨‍💻 Want to improve StayBnb? Contributions are welcome!  
1. **Fork** the project  
2. **Create a new branch** (`feature/new-feature`)  
3. **Commit changes** (`git commit -m 'Added feature'`)  
4. **Push to GitHub** & **Create a PR**  

---

## 📜 License
📄 This project is open-source and available under the **MIT License**.

---

## 🎯 Contact
📧 **Email:** rambedade2308@email.com  
  

🚀 *Made with ❤️ by [Ram]*

