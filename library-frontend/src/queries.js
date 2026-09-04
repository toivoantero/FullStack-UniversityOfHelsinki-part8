import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
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
`;
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`;
export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const ME = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`;
