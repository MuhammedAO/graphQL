import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost'

import { ApolloProvider } from '@apollo/react-hooks'
import AddBook from './components/AddBook';


//apollo set-up
const client = new ApolloClient({
 uri: 'http://localhost:4000/graphql'
})

function App() {
 return (
  <ApolloProvider client={client}>
   <div id="main">
    <h1>Clerisy's Book Club</h1>
    <BookList />
    <AddBook/>
   </div>
  </ApolloProvider>
 );
}

export default App;
