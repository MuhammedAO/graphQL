import React,{useState} from 'react'
import { graphql } from 'react-apollo'
import {getBooksQuery} from './queries/query'
import BookDetails from './BookDetails'


const BookList = (props) => {

   const [selected, setSelected] = useState(null)



  const displayBooks = () => {
    let data = props.data
    const { loading } = data
    if (loading) {
      return (
        <div><h5>Loading Books..</h5></div>
      )
    } else {
      return data.books.map(({id, name}) => {
        return (
          <li key={id} onClick={() => setSelected(id)}>{name}</li>
        )
      })
    }
  }
  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
        <BookDetails bookId={selected}/>
      </ul>
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
