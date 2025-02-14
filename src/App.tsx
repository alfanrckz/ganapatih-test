import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { Map } from './pages/Map';
import { MainLayout } from './templates/layouts/MainLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>

          <Route path="/map" element={<Map />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/linnegraph" element={<About />} />
          </Route>
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;