# LitedIn - Empowering Hostel Communities with a Connection Platform
Checkout the website [LitedIn Website](https://litedin.netlify.app/)

LitedIn is an interactive web platform designed to enhance hostel life by streamlining complaint management, visualizing hostel layouts, and fostering community interactions through features like real-time chat and party mode.

## 🚀 Features
- **Interactive Hostel Map**: Visual representation of hostel rooms with resident details displayed on hover.
- **Complaint Management System**: Residents can register complaints and track their status in real-time.
- **Admin Panel**: Admins can view, manage, and resolve complaints.
- **Party Mode**: Create and join virtual parties for shared interests.
- **Real-Time Chat**: Instant communication using WebSocket.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Prisma ORM)
- **Real-Time Communication**: Socket.IO (WebSocket)
- **Authentication**: JWT (JSON Web Token)

## 📦 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/LitedIn.git
    cd LitedIn
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```

3. Create a `.env` file in both `client` and `server` directories and add required environment variables (refer to `.env.example` for reference).

4. Start the development servers:
    ```bash
    # Start backend
    cd server
    npm run dev

    # Start frontend
    cd client
    npm run dev
    ```

5. Access the application at `http://localhost:5173`

## ⚙️ Environment Variables

Backend `.env` variables:
```
DATABASE_URL=mongodb://localhost:27017/litedin
JWT_SECRET=your-secret-key
```

Frontend `.env` variables:
```
VITE_API_URL=http://localhost:3000/api
```

## 🧑‍💻 Contributing

Contributions are welcome! Follow these steps:
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## 💡 Future Enhancements
- Mobile app support
- Push notifications
- AI-powered complaint analytics
- Gamification for community engagement

## 📧 Contact
For inquiries or feedback, feel free to contact us at `support@litedin.com`.


