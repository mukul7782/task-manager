import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div style={{ maxWidth:400, margin:'80px auto', padding:'0 20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color:'red', fontSize:13 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          style={{ width:'100%', padding:10, marginBottom:10 }} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          style={{ width:'100%', padding:10, marginBottom:12 }} />
        <button type="submit" style={{ width:'100%', padding:10 }}>Login</button>
      </form>
      <p style={{ marginTop:12, fontSize:13 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}