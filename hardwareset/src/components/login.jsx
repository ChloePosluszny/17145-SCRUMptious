import React, { useState } from 'react';

const SimpleLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you can implement your login logic
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleLogin}style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Username"
        value={username}
        minLength={6} 
        required
        onChange={(e) => setUsername(e.target.value)
        }
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        minLength={6}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" style={styles.button} >Login</button>
    </form>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '300px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default SimpleLogin;
