import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('book-user-token'))
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
            <button onClick={onLogout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} />

      <LoginForm show={!token ? page === 'login' : page === null} setToken={setToken} />

    </div>
  )
}

export default App
