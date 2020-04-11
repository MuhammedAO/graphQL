const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

//this schema file has 3 responsiblities
//define types e.g BookType
//define relationships between types
//define root queries which describes how a user can initally just into the graph and grab data.

//types
const BookType = new GraphQLObjectType({
 name: 'Book',
 fields: () => ({
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  genre: { type: GraphQLString }
 })
})


//root queries
const RootQuery = new GraphQLObjectType({
 name: 'RootQueryType',
 fields: {
  book: {
   type: BookType,
   args: { id: { type: GraphQLString } },
   resolve(parent, args) {
    // code to get data from dB/other source.
   }
  }
 }
})

module.exports = new GraphQLSchema({
 query: RootQuery
})