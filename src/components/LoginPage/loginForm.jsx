import InputElement from '../AccountInputElement'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useAuthContext } from '../../contexts/auth'
import { LoginButton } from '../Buttons/Buttons.jsx'

export default function LoginForm() {
  const { setUser } = useAuthContext()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({
    hasError: null,
    errorText: '',
  })

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data, error } = await apiClient.login({
      email: formData.email,
      password: formData.password,
    })
    if (data) {
      setUser(data.user)
      apiClient.setToken(data.token)
    }
    if (error) {
      const errorMessage = error ? error : 'An unknown error occurred'
      setError({
        ...error,
        hasError: true,
        errorText: 'ERROR: ' + errorMessage,
      })
    }
  }

  function Error() {
    return error.hasError ? <p style={styles.formError}>{error.errorText}</p> : <></>
  }

  return (
    <div style={styles.div}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <InputElement
          type='email'
          name='email'
          placeholder='Enter Email'
          label='Enter Email'
          onChange={handleInputChange}
          value={formData.email}
        />
        <InputElement
          type='password'
          name='password'
          placeholder='Enter Password'
          label='Enter Password'
          onChange={handleInputChange}
          value={formData.password}
        />
        <LoginButton />
      </form>
      <Error />
    </div>
  )
}

const styles = {
  div: {
    margin: 'auto',
    width: 'fit-content',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '400px',
    gridGap: '50px 50px',
  },
  formError: {
    color: '#FF5C5C',
    fontStyle: 'italic',
  },
}
