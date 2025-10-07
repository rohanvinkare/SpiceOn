# SpiceOn

SpiceOn is a modern food ordering web application built with React and Vite, designed for fast, responsive user experiences. It allows users to browse restaurants, view menus, manage a cart, search for food, and handle location-based discovery. The platform supports features like authentication, lazy-loading, and dynamic routing, with a clean, mobile-friendly interface utilizing Tailwind CSS.

## Features
- Browse restaurants and menus
- Search for food and restaurants
- Add items to cart and manage orders
- User authentication & login
- Location-based search and recommendations
- Responsive UI with Tailwind CSS
- Lazy loading of components for performance
- Redux-based state management
- Toast notifications for user feedback

## Tech Stack
- **React**: UI development with hooks, context, and components
- **Redux & React-Redux**: State management
- **React Router**: Navigation and dynamic routing
- **Vite**: Next-gen frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code quality and linting with React & Hooks plugins
- **react-hot-toast**: Notifications

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/rohanvinkare/SpiceOn.git
cd SpiceOn
npm install # or yarn
```

### Running Locally
```bash
npm run dev # or yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build # or yarn build
```

## Folder Structure
- `src/`
  - `components/`: React components (Help, Head, Body, Cart, etc.)
  - `context/`: Context API definitions
  - `utils/`: Redux store and slices
  - `App.jsx`, `main.jsx`: App entry and setup
- `public/`: Static assets

## Contributing
Contributions are welcome! Please open issues or pull requests for bugs, features, or documentation improvements.

## License
This project is open source. See LICENSE file for details.

## Live Demo
[https://spiceon.vercel.app/](https://spiceon.vercel.app/)
