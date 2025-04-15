import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Offers from './pages/Offers.jsx';
import BusinessTypes from './pages/BusinessTypes.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './components/home.jsx'; // Pantalla protegida
import nada from './components/CategoryForm.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* You can add more routes here */}
    </Routes>
  );
}

export default App;