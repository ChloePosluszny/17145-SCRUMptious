import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import React from 'react'
import { useLocation } from 'react-router-dom';
export default function(){
    const location = useLocation();
    const { username } = location.state;
  return(
  <>
    <Header/>
    <h1> Project Page</h1>
    <h2>Welcome {username}!</h2>
    <Footer/>
  </>
  )
}
