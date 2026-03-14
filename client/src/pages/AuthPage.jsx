import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(`${BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong.');
        return;
      }

      login(data.token, data.user);
      navigate('/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setIsLogin((v) => !v);
    setError('');
  }

  function inputStyle(field) {
    return {
      width: '100%',
      background: 'var(--ink3)',
      color: 'var(--text)',
      border: `1px solid ${focusedField === field ? 'var(--lime)' : 'var(--line)'}`,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '1rem',
      marginBottom: '1rem',
      outline: 'none',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
    };
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: 'auto',
        background: 'var(--ink2)',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid var(--line)',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--lime)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          marginTop: 0,
          fontFamily: "'Syne', sans-serif",
        }}>
          Velocit
        </h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              style={inputStyle('name')}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              autoComplete="name"
            />
          )}
          <input
            style={inputStyle('email')}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            autoComplete="email"
          />
          <input
            style={inputStyle('password')}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            required
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'var(--lime)',
              color: 'var(--ink)',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '1rem',
              marginTop: '0.5rem',
              fontFamily: 'inherit',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Create account'}
          </button>

          {error && (
            <p style={{
              color: 'var(--coral)',
              textAlign: 'center',
              marginTop: '0.5rem',
              marginBottom: 0,
              fontSize: '0.875rem',
            }}>
              {error}
            </p>
          )}
        </form>

        <ToggleText isLogin={isLogin} onSwitch={switchMode} />
      </div>
    </div>
  );
}

function ToggleText({ isLogin, onSwitch }) {
  const [hovered, setHovered] = useState(false);

  return (
    <p style={{
      color: 'var(--fog)',
      textAlign: 'center',
      marginTop: '1rem',
      marginBottom: 0,
      fontSize: '0.875rem',
    }}>
      {isLogin ? "Don't have an account? " : 'Already have an account? '}
      <span
        onClick={onSwitch}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: 'pointer',
          color: hovered ? 'var(--lime)' : 'var(--lime)',
          textDecoration: hovered ? 'underline' : 'none',
        }}
      >
        {isLogin ? 'Register' : 'Login'}
      </span>
    </p>
  );
}
