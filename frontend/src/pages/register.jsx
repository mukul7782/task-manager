import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
   return (
    <div style={{ maxWidth:400, margin:'80px auto', padding:'0 20px' }}>
      <h2>Create account</h2>
      {error && <p style={{ color:'red', fontSize:13 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['name','email','password'].map(field => (
          <input key={field} name={field} value={form[field]}
            type={field==='password'?'password':'text'}
            placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
            onChange={handleChange} required
            style={{ width:'100%', padding:10, marginBottom:10, display:'block' }} />
        ))}
        <button type="submit" style={{ width:'100%', padding:10 }}>Register</button>
      </form>
      <p style={{ marginTop:12, fontSize:13 }}>
        Have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}