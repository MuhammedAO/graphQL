import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost'

import { ApolloProvider } from '@apollo/react-hooks'


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
   </div>
  </ApolloProvider>
 );
}

export default App;
