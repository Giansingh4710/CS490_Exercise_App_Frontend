import InputElement from '../AccountInputElement'
import { LandingPageButton } from '../Buttons/Buttons.jsx'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useAuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext()
  const [formData, setFormData] = useState({
    email: 'bob@bob.com',
    password: '123',
    confirm_password: '123',
  })

  const [error, setError] = useState({
    hasError: null,
    errorText: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formData.password !== formData.confirm_password) {
      setError({
        hasError: true,
        errorText: 'ERROR: Passwords do not match.',
      })
      return
    }
    const { data, error } = await apiClient.register({
      email: formData.email,
      password: formData.password,
    })

    if (data) {
      console.log('Data:', data)
      navigate('/Register/Survey');
      setUser(data.user) // will change page. When you change user
      apiClient.setToken(data.token)
    }
    if (error) {
      console.log('ERROR:', error)
      setError({
        hasError: true,
        errorText: `ERROR: ${error}`,
      })
    }
  }

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  function Error() {
    return error.hasError ? <p style={styles.formError}>{error.errorText}</p> : <></>
  }

  // console.log(`${API_BASE_URL}/register`)
  return (
    <div style={styles.div}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <InputElement
          type='email'
          name='email'
          placeholder='youremail@example.com'
          label='EMAIL'
          additionalStyles={{
            width: '400px',
          }}
          onChange={handleInputChange}
          value={formData.email}
        />
        <InputElement
          type='password'
          name='password'
          placeholder='Password'
          label='PASSWORD'
          onChange={handleInputChange}
          value={formData.password}
        />
        <InputElement
          type='password'
          name='confirm_password'
          placeholder='Confirm Password'
          label='CONFIRM PASSWORD'
          onChange={handleInputChange}
          value={formData.confirm_password}
        />
        <Error />
        <LandingPageButton name='Create Account' type='submit' additionalStyles={styles.button} />
      </form>
    </div>
  )
}

const styles = {
  div: {
    margin: 'auto',
    backgroundColor: '#3F4D67',
    width: 'fit-content',
    position: 'relative',
  },
  form: {
    display: 'relative',
    textAlign: 'center',
    backgroundColor: '#00000',
  },
  button: {
    backgroundColor: '#FFFFFF',
    color: '#3F4D67',
    fontSize: '24px',
    cursor: 'pointer',
    width: '250px',
    height: '61px',
    borderRadius: '10px',
    margin: 'auto',
    marginTop: '50px',
  },
  formError: {
    color: '#FF5C5C',
    fontStyle: 'italic',
  },
}
