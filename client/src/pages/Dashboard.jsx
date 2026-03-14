import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const STATUS_COLORS = {
  draft: 'var(--fog)',
  wizard_complete: 'var(--sky)',
  srs_complete: 'var(--violet)',
  preview_complete: 'var(--lime)',
}

export default function Dashboard() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }
    fetch(`${BASE}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data : data.projects ?? []))
      .finally(() => setLoading(false))
  }, [token, navigate])

  function handleLogout() {
    logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ background: 'var(--ink)', minHeight: '100vh', padding: '2rem', color: 'var(--text)' }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--lime)', fontWeight: 700, fontSize: '1.5rem' }}>Velocit</span>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            color: 'var(--fog)',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      <button
        onClick={() => navigate('/projects/new')}
        style={{
          background: 'var(--lime)',
          color: 'var(--ink)',
          fontWeight: 700,
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '2rem',
          display: 'block',
        }}
      >
        New Project
      </button>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--fog)' }}>
          <p style={{ marginBottom: '1rem' }}>No projects yet</p>
          <button
            onClick={() => navigate('/projects/new')}
            style={{
              background: 'var(--lime)',
              color: 'var(--ink)',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)

  const statusColor = STATUS_COLORS[project.status] || 'var(--fog)'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--ink2)',
        border: `1px solid ${hovered ? 'var(--lime)' : 'var(--line)'}`,
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{project.name}</div>
      <div style={{ color: 'var(--fog)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{project.client_name}</div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {project.industry && (
          <span
            style={{
              background: 'var(--line)',
              color: 'var(--fog)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.75rem',
            }}
          >
            {project.industry}
          </span>
        )}
        <span
          style={{
            background: 'var(--line)',
            color: statusColor,
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          {project.status}
        </span>
      </div>
      <div style={{ color: 'var(--fog)', fontSize: '0.75rem' }}>
        {new Date(project.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </div>
  )
}
