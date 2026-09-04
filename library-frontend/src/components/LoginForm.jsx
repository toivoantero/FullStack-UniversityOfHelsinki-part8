import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useApolloClient } from '@apollo/client/react'

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('book-user-token', token)
      client.resetStore()
    },
    onError: (error) => {
      setErrorMessage("login failed: " + error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={submit}>
        <label>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm