import { useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../../components/PageNav/PageNav';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('saddam@example.com');
  const [password, setPassword] = useState('qwerty');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    navigate('/app');
  };
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Sign in</Button>
        </div>
      </form>
    </main>
  );
}
