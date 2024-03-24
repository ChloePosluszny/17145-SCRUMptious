import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ProjectsPage from '../components/ProjectsPage.js'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function(){
  const navigate = useNavigate();
  useEffect(() => {
    const storedLogin = JSON.parse(localStorage.getItem('login'));
    if (storedLogin) {
      if (!storedLogin.isLoggedIn) {
        navigate('/');
      }
    }
  }, []);

  return(
  <>
    <Header />
    <div style={styles.container}>
      <div style={styles.content}>
        <ProjectsPage />
      </div>
      <Footer />
    </div>
  </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
    overflowX: 'hidden', // Prevent horizontal scrolling
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '80px', // Adjust as needed
  },
};