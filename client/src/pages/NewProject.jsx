import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const INDUSTRIES = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Real Estate', 'Logistics', 'Legal', 'Marketing', 'Other']
const PROJECT_TYPES = ['Web Application', 'Mobile App', 'E-Commerce', 'CRM', 'Dashboard/Analytics', 'CMS', 'API/Backend', 'Other']

const inputStyle = {
  width: '100%',
  background: 'var(--ink2)',
  color: 'var(--text)',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '1rem',
  marginBottom: '1rem',
  boxSizing: 'border-box',
}

const labelStyle = {
  color: 'var(--fog)',
  fontSize: '0.875rem',
  marginBottom: '4px',
  display: 'block',
}

const nextBtnStyle = {
  background: 'var(--lime)',
  color: 'var(--ink)',
  fontWeight: 700,
  border: 'none',
  borderRadius: '8px',
  padding: '10px 24px',
  cursor: 'pointer',
}

const backBtnStyle = {
  background: 'transparent',
  border: '1px solid var(--line)',
  color: 'var(--fog)',
  borderRadius: '8px',
  padding: '10px 24px',
  cursor: 'pointer',
}

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{ ...style, borderColor: focused ? 'var(--lime)' : 'var(--line)', outline: 'none' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function FocusSelect({ style, children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      {...props}
      style={{ ...style, borderColor: focused ? 'var(--lime)' : 'var(--line)', outline: 'none' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  )
}

function FocusTextarea({ style, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      style={{ ...style, borderColor: focused ? 'var(--lime)' : 'var(--line)', outline: 'none', minHeight: '120px', resize: 'vertical' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function StepIndicator({ currentStep }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
      {[1, 2, 3].map(step => (
        <div
          key={step}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            background: step === currentStep ? 'var(--lime)' : 'var(--ink2)',
            color: step === currentStep ? 'var(--ink)' : 'var(--fog)',
            fontSize: '0.875rem',
          }}
        >
          {step}
        </div>
      ))}
      <span style={{ color: 'var(--fog)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
        Step {currentStep} of 3
      </span>
    </div>
  )
}

function Step1({ formData, onChange, onNext }) {
  return (
    <div>
      <label style={labelStyle}>Project Name *</label>
      <FocusInput
        style={inputStyle}
        value={formData.name}
        onChange={e => onChange('name', e.target.value)}
        placeholder="Project Name"
      />

      <label style={labelStyle}>Client Name</label>
      <FocusInput
        style={inputStyle}
        value={formData.client_name}
        onChange={e => onChange('client_name', e.target.value)}
        placeholder="Client Name"
      />

      <label style={labelStyle}>Industry</label>
      <FocusSelect
        style={inputStyle}
        value={formData.industry}
        onChange={e => onChange('industry', e.target.value)}
      >
        <option value="">Select Industry</option>
        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
      </FocusSelect>

      <label style={labelStyle}>Project Type</label>
      <FocusSelect
        style={inputStyle}
        value={formData.project_type}
        onChange={e => onChange('project_type', e.target.value)}
      >
        <option value="">Select Project Type</option>
        {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </FocusSelect>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button
          style={{ ...nextBtnStyle, opacity: !formData.name.trim() ? 0.5 : 1, cursor: !formData.name.trim() ? 'not-allowed' : 'pointer' }}
          onClick={onNext}
          disabled={!formData.name.trim()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function Step2({ formData, onChange, onBack, onNext }) {
  return (
    <div>
      <label style={labelStyle}>Core Features *</label>
      <FocusTextarea
        style={inputStyle}
        value={formData.core_features}
        onChange={e => onChange('core_features', e.target.value)}
        placeholder="Describe the main features your client needs. Be specific — this becomes your SRS."
      />

      <label style={labelStyle}>User Types</label>
      <FocusTextarea
        style={inputStyle}
        value={formData.user_types}
        onChange={e => onChange('user_types', e.target.value)}
        placeholder="Who uses this? e.g. Admin, Customer, Staff"
      />

      <label style={labelStyle}>Integrations</label>
      <FocusTextarea
        style={inputStyle}
        value={formData.integrations}
        onChange={e => onChange('integrations', e.target.value)}
        placeholder="Any third-party services? e.g. Stripe, SendGrid"
      />

      <label style={labelStyle}>Estimated Users</label>
      <FocusInput
        style={inputStyle}
        value={formData.estimated_users}
        onChange={e => onChange('estimated_users', e.target.value)}
        placeholder="How many users in year 1?"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button style={backBtnStyle} onClick={onBack}>Back</button>
        <button
          style={{ ...nextBtnStyle, opacity: !formData.core_features.trim() ? 0.5 : 1, cursor: !formData.core_features.trim() ? 'not-allowed' : 'pointer' }}
          onClick={onNext}
          disabled={!formData.core_features.trim()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

const SUMMARY_FIELDS = [
  { key: 'name', label: 'Project Name' },
  { key: 'client_name', label: 'Client Name' },
  { key: 'industry', label: 'Industry' },
  { key: 'project_type', label: 'Project Type' },
  { key: 'core_features', label: 'Core Features' },
  { key: 'user_types', label: 'User Types' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'estimated_users', label: 'Estimated Users' },
]

function Step3({ formData, onBack, onSubmit, loading, error }) {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <tbody>
          {SUMMARY_FIELDS.map(({ key, label }) => formData[key] ? (
            <tr key={key}>
              <td style={{ color: 'var(--fog)', fontSize: '0.875rem', padding: '8px 0', verticalAlign: 'top', width: '40%' }}>{label}</td>
              <td style={{ color: 'var(--text)', fontSize: '0.875rem', padding: '8px 0', whiteSpace: 'pre-wrap' }}>{formData[key]}</td>
            </tr>
          ) : null)}
        </tbody>
      </table>

      {error && <p style={{ color: 'var(--red, #ff5c5c)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button style={backBtnStyle} onClick={onBack} disabled={loading}>Back</button>
        <button
          style={{ ...nextBtnStyle, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </div>
  )
}

export default function NewProject() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    client_name: '',
    industry: '',
    project_type: '',
    core_features: '',
    user_types: '',
    integrations: '',
    estimated_users: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

      const res = await fetch(`${BASE}/api/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formData.name,
          client_name: formData.client_name,
          industry: formData.industry,
          project_type: formData.project_type,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to create project')
      const data = await res.json()
      console.log('Project created:', data)
      const projectId = data.project?.id || data.id

      const inputsRes = await fetch(`${BASE}/api/projects/${projectId}/inputs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      })
      if (!inputsRes.ok) throw new Error((await inputsRes.json()).message || 'Failed to save project inputs')

      navigate(`/projects/${projectId}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1
            formData={formData}
            onChange={handleChange}
            onNext={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 2 && (
          <Step2
            formData={formData}
            onChange={handleChange}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}
        {currentStep === 3 && (
          <Step3
            formData={formData}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
