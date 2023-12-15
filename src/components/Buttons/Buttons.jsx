import './Buttons.css'
export function LandingPageButton({ name, additionalStyles }) {
  const hover = (e) => {
    e.target.style.background = '#c4c4c4'
    e.target.style.color = '#3F4D67'
  }
  const unHover = (e) => {
    e.target.style.background = '#FFFFFF'
    e.target.style.color = '#3F4D67'
  }

  return (
    <button
      style={{ ...styles.button, ...additionalStyles }}
      onMouseEnter={hover}
      onMouseLeave={unHover}>
      {name}
    </button>
  )
}

export function LoginButton() {
  const hover = (e) => {
    e.target.style.background = 'white'
    e.target.style.color = '#3F4D67'
  }
  const unHover = (e) => {
    e.target.style.background = '#FFFFFF'
    e.target.style.color = '3F4D67'
  }

  return (
    <button
      style={{
        backgroundColor: '#FFFFFF',
        color: '#3F4D67',
        fontSize: '24px',
        cursor: 'pointer',
        width: '166px',
        height: '61px',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '50px',
        border: 'none',
        fontWeight: 'bold',
      }}
      onMouseEnter={hover}
      onMouseLeave={unHover}>
      Login
    </button>
  )
}

export function BlueSubmitButton({ handleOnClick }) {
  return (
    <div className='blue-btn'>
      <button className='blue-submit-btn' onClick={handleOnClick}>
        SUBMIT
      </button>
    </div>
  )
}

export function BlueCancelButton({ handleOnClick }) {
  return (
    <div className='blue-btn btn'>
      <button className='blue-cancel-btn' onClick={handleOnClick}>
        CANCEL
      </button>
    </div>
  )
}

export function RedCancelButton({ handleOnClick, title }) {
  return (
    <div className='red-btn btn'>
      <button className='red-cancel-btn' onClick={handleOnClick} title={title}>
        CANCEL
      </button>
    </div>
  )
}
export function GreenAcceptButton({ handleOnClick }) {
  return (
    <div className='green-btn btn'>
      <button className='green-accept-btn' onClick={handleOnClick}>
        ACCEPT
      </button>
    </div>
  )
}

export function RedDeclineButton({ handleOnClick }) {
  return (
    <div className='red-decline-btn btn'>
      <button className='red-decline-btn' onClick={handleOnClick}>
        DECLINE
      </button>
    </div>
  )
}

export function BlueRequestButton({ handleOnClick }) {
  return (
    <div className='btn'>
      <button className='request-btn btn' onClick={() => handleOnClick()} title='Request'>
        Request
      </button>
    </div>
  )
}

const styles = {
  button: {
    backgroundColor: '#FFFFFF',
    color: '#3F4D67',
    fontSize: '24px',
    cursor: 'pointer',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
}
