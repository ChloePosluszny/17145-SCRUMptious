import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import React from 'react'
import backgroundImage from '../assets/cat.gif';

export default function(){
  return(
  <>
    <Header/>
    <div style={styles.div}>
      <h2 style={styles.H2}>
        About us
      </h2>
      <p style={styles.P1}>
        Project Created by: Chloe Posluszny,Rahman Khandakar ,Spencer Keen, and Erik Halldorson.
      </p>
      <p style ={styles.P2}>
        This project aims to create a website which mimic an example of a software as a service buisness. Users create an account for themselves where they can purchase rentable hardware and monitor it's usage. The project mainly relies on React, Python Flask, and Mongo DB. This website was created for Dr. Samant's spring 2024 class at UT Austin.
      </p>

      <img src={backgroundImage}/>
    </div>
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
    paddingBottom: '40px'
  },
  H2: {
    fontSize:'40px'
  },
  P1: {
    fontSize:'30px',
  },
  P2: {
    fontSize:'22px',
    maxWidth:'800px',
    textAlign: 'center'
  },
}
