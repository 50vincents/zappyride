import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import './Home.css';

function Home() {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='home_container'>
      <div className="home_title">Thinking about switching to EV?</div>
      <button className="home_button" onClick={() => setShowModal(true)}>Get Started</button>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  )
}

export default Home
