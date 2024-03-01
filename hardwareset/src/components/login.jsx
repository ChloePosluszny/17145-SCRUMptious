import React, { useState } from 'react';
import {Button,TextField}  from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SimpleLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password })
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        alert("incorrect username or password")
        throw new Error("incorrect username or password");
      }

      navigate('/projects',{state: {username: responseData['Username']}});
      
  } catch (error) {
      console.error('login failed:', error);
  }
    console.log('Username:', username);
    console.log('Password:', password);
  };


  return (
    <form onSubmit={handleLogin} style={styles.container}>
      <h2 style={styles.title}>Login</h2>
     
       <TextField
          label='Username'
          style={styles.input}
          variant='outlined'
          id="username"
          value={username}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          placeholder='JoeBiden123'
          minLength={6}
          required
         />

       <TextField
          label='Password'
          type='password'
          style={styles.input}
          variant='outlined'
          id="Password"
          value={password}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password123'
          minLength={6}
          required
       />
      <Button type="submit" variant='contained' style={styles.button}>Login</Button>
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
