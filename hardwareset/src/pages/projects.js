import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import ProjectsPage from '../components/ProjectsPage.js'
import React from 'react'
import { useLocation } from 'react-router-dom';
export default function(){
    const location = useLocation();
    const { username } = location.state;
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