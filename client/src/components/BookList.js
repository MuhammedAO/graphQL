import React from 'react'
import { graphql } from 'react-apollo'
import {getBooksQuery} from './queries/query'


const BookList = (props) => {
  const displayBooks = () => {
    let data = props.data
    const { loading } = data
    if (loading) {
      return (
        <div><h5>Loading Books..</h5></div>
      )
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }
  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
