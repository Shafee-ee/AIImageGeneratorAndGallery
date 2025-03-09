**AI Image Generator

This is a MERN stack project that generates AI images based on user prompts. Users can enter a prompt, generate an image using an AI model, and store the generated images in a database. The application also supports dark mode and light mode.

Features

AI-powered image generation

Dark mode and light mode toggle

Gallery to display saved images

Styled UI with responsive design

Tech Stack

Frontend: React (Vite), Axios, CSS

Backend: Node.js, Express, MongoDB

AI API: Hugging Face Inference API

Project Structure

project-root/
│── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ImageGenerator.jsx
│   │   │   ├── Gallery.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   ├── Navbar.css
│── server/                 # Backend (Node.js, Express)
│   ├── routes/
│   │   ├── imageRoutes.js
│   ├── models/
│   │   ├── Image.js
│   ├── server.js
│── .env                     # API Keys & Config
│── README.md

Installation

Clone the repository

git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator

Setup the Backend

cd server
npm install

Create a .env file in the server/ directory and add:

MONGO_URI=your_mongodb_uri
AI_API_KEY=your_huggingface_api_key

Start the backend:

npm start

Setup the Frontend

cd client
npm install
npm run dev

Usage

Enter a prompt in the text box.

Click Generate to fetch an AI-generated image.

The image will be displayed and saved in the gallery.

Use the dark mode toggle in the Navbar.

API Routes

POST /api/images/generate

Generates an AI image based on user input.

Body: { prompt: "your prompt" }

POST /api/images/save

Saves generated images to MongoDB.

GET /api/images

Retrieves all saved images.

Future Improvements

Download generated images

User authentication for saved images

More AI model options

License

This project is open-source and free to use.

**
