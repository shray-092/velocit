import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';

const Landing = () => <div style={{ color: 'var(--lime)', padding: '2rem' }}>Landing Page</div>;
const SpecGen = () => <div style={{ color: 'var(--lime)', padding: '2rem' }}>SpecGen page - Sprint 3</div>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/projects/:id" element={<SpecGen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
