import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';
import Button from '../components/Button';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e) {
    // Guard
    e.preventDefault();
    if (!email || !password) return;

    // Login
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
