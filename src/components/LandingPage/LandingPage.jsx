import React from 'react'
import Navbar from '../Navbar.jsx'
import { Link } from 'react-router-dom'
import { LandingPageButton } from '../Buttons/Buttons.jsx'
import ExerciseBank from '../ExerciseBank/ExerciseBank.js'
import Achieve from '../../images/Achieve.jpg'
import Track from '../../images/Track.jpg'
import Connect from '../../images/Connect.png'
import './LandingPage.css'
import { useState } from 'react'

export default function LandingPage() {
  const [exerciseBankModalIsOpen, setExerciseModalIsOpen] = useState(false)

  return (
    <>
      {exerciseBankModalIsOpen && (
        <ExerciseBank viewOnly={true} setExerciseModalIsOpen={setExerciseModalIsOpen} />
      )}
      <div className={exerciseBankModalIsOpen ? 'landing-page-blurred' : 'landing-page'}>
        <Navbar page='landing' />
        <div className='landing-page-first-box'>
          <h1 className='landing-page-header'>Welcome to FitFusion</h1>
          <p className='landing-page-info'>
            Discover a healthier, happier you with FitFusion. This is where expert coaching,
            activity tracking, and mood management converge. Tailored insights and personal guidance
            at your fingertips, fostering your journey towards well-being. Your goals, our mission.
            Start transforming today!
          </p>
          <div className='exercise-bank-link-container'>
            <p className='landing-page-info landing-page-exercise-bank-link'>
              Click{' '}
              <p
                className='landing-page-info landing-page-exercise-bank-link exercise-link'
                onClick={() => setExerciseModalIsOpen(true)}>
                here
              </p>{' '}
              to browse our exercise bank!
            </p>
          </div>
          <div className='landing-page-register-btn'>
            <Link to='/Register'>
              <LandingPageButton name='Sign Up Now!' />
            </Link>
          </div>
        </div>

        <div className='landing-page-second-box'>
          <h1 className='landing-page-header-second-box'>SEE WHAT FITFUSION CAN DO FOR YOU</h1>
          <div className='landing-page-card-container'>
            <InfoCard
              title='CONNECT'
              text='In FitFusion, discover a world of expert coaches. Get tailored guidance at your fingertips, making personal connections that helps transform goals into reality.'
              img={Connect}
            />
            <InfoCard
              title='TRACK'
              text='With FitFusion, every activity and calorie counts. Precision tracking meets intuitive design, empowering you with insights for a healthier lifestyle.'
              img={Track}
            />
            <InfoCard
              title='ACHIEVE'
              text='Achieve holistic well-being with FitFusion. Embrace mood tracking for emotional balance, helping you paving the way to a happier and more fulfilled you.'
              img={Achieve}
            />
          </div>
          <div className='landing-page-register-btn'>
            <Link to='/Register'>
              <LandingPageButton name='Sign Up Now!' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export function InfoCard({ title, text, img }) {
  return (
    <div className='landing-page-info-card'>
      <h4 className='landing-page-info-card-header'>{title}</h4>
      <img className='landing-page-info-card-img' src={img} alt={text} />
      <p className='landing-page-info-card-text'>{text}</p>
    </div>
  )
}
