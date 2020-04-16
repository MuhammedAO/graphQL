const graphql = require('graphql')
const  _  =  require ('lodash')

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql

//this schema file has 3 responsiblities
//define types e.g BookType
//define relationships between types
//define root queries which describes how a user can initally jump into the graph and grab data.

//dummy data
const books = [
 {name:'Harry Potter 1', genre:'fiction', id:'1', authorId:'1'},
 {name:'Harry Potter 2', genre:'fiction', id:'2', authorId:'2'},
 {name:'Harry Potter 3', genre:'fantasy', id:'3', authorId:'3'}
]

//dummy data
const authors = [
    {name: 'Muhammed O.', age:43, id: '1'},
    {name: 'Muhammed A.', age:34, id: '2'},
    {name: 'Muhammed Y.', age:33, id: '3'}
]

//types
const BookType = new GraphQLObjectType({
 name: 'Book',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  genre: { type: GraphQLString },
  author:{
    type: AuthorType,
    resolve(parent, args){
        return _.find(authors, {id: parent.authorId})
    }
  }
 })
})

const AuthorType = new GraphQLObjectType({
 name: 'Author',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  age: { type: GraphQLInt }
 })
})


//root queries
const RootQuery = new GraphQLObjectType({
 name: 'RootQueryType',
 fields: {
  book: {
   type: BookType,
   args: { id: { type: GraphQLID } },
   resolve(parent, args) {
    // code to get data from dB/other source.
    return _.find(books, {id: args.id})
   }
  },
  author:{
    type: AuthorType,
    args: {id : {type: GraphQLID}},
    resolve(parent, args){
     return _.find(authors, {id:args.id})
    } 
  }
 }
})

module.exports = new GraphQLSchema({
 query: RootQuery
})