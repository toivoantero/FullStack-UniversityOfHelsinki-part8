import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
    const resultBook = useQuery(ALL_BOOKS)
    const resultMe = useQuery(ME)

    if (!show) {
        return null
    }

    const books = resultBook?.data?.allBooks
    const currentUser = resultMe?.data?.me

    const filteredBooks = books.filter(book => book.genres && book.genres.includes(currentUser.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>

            <p>books in your favorite genre <span>{currentUser.favoriteGenre}</span></p>

            <table style={{ width: "60vw", textAlign: "left" }}>
                <tbody>
                    <tr>
                        <th style={{ width: "50%" }}></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks
                        .map((b) => (
                            <tr key={b.id}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Recommendations
