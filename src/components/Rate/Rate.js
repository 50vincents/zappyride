import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import './Rate.css';

function Rate() {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='rate_container'>
      <div className="rate_title">Thinking about switching to EV?</div>
      <button className="rate_button" onClick={() => setShowModal(true)}>Get Started</button>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  )
}

export default Rate
