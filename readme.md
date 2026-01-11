# My Movies 🎬

A React & TypeScript web app to **browse, search, and favorite movies** using the TMDb API.

Users can view popular movies, search for their favorites, and save movies locally with persistent favorites using `localStorage`.

---

## 🔹 Features

- Browse **popular movies** on page load
- **Search movies** by title using TMDb API
- **Add/remove favorites** with heart button
- Favorites persist across reloads using `localStorage`
- Responsive UI using **Bootstrap 5**
- Clean routing with **React Router v6**
- Friendly 404 page with **Go Home** functionality

---

## 🛠️ Tech Stack

- **React** (v18+)
- **TypeScript**
- **React Router DOM**
- **Bootstrap 5**
- **TMDb API**
- **Vite** (for development)

---

## 📸 Screenshots

![Home Page](./screenshots/home.png)  
_Browse popular movies and search_

![Favorites Page](./screenshots/favorites.png)  
_Your saved favorite movies_

## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/web-react-project.git
cd web-react-project
```

2. Install the dependencies

```bash
npm install
```

3. Create a .env file in the root:

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```
