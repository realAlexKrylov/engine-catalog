import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin/Admin';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EngineDetail from './pages/Engines/EngineDetail';
import Engines from './pages/Engines/Engines';
import Home from './pages/Home/Home';
import Manufacturers from './pages/Manufacturers/Manufacturers';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="engines" element={<Engines />} />
            <Route path="engines/:id" element={<EngineDetail />} />
            <Route path="manufacturers" element={<Manufacturers />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
