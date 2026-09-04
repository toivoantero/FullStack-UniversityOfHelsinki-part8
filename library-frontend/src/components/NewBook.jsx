import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { CREATE_BOOK } from '../queries'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
    }
  }
`
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    /*
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
    */
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            genre
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
