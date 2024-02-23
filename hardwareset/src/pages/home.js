import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import Login from '../components/login.jsx'
import React from 'react'
export default function(){

  return(
  <>
    <Header/>
    <div style={styles.div}>
    <h2>Please log in to view the status of your hardware.</h2>
    </div>
    <Login/>
    <Footer/>
  </>
  )
}
  const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '80px'
  },
}
