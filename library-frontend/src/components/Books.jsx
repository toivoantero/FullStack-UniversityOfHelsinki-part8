import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const resultByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    skip: !genre,
  })
  const resultAll = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  const booksAll = resultAll?.data?.allBooks || []
  const genres = [...new Set(booksAll.flatMap(b => b.genres))];
  const booksByGenre = resultByGenre?.data?.allBooks || []

  return (
    <div>
      <h2>books</h2>

      {genre && <p>in genre {genre}</p>}

      <table style={{ width: "60vw", textAlign: "left" }}>
        <tbody>
          <tr>
            <th style={{ width: "50%" }}></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!genre ? (
            <>
              {booksAll.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
              }
            </>)
            :
            (<>
              {
                booksByGenre.map((b) => (
                  <tr key={b.id}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))
              }
            </>)
          }
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>

    </div>
  )
}

export default Books
