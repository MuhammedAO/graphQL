const graphql = require('graphql')
const  _  =  require ('lodash')
const Book = require('../models/book')
const Author = require('../models/author')


const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } = graphql

//this schema file has 3 responsiblities
//define types e.g BookType
//define relationships between types
//define root queries which describes how a user can initally jump into the graph and grab data.



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
        // return _.find(authors, {id: parent.authorId})
    }
  }
 })
})

const AuthorType = new GraphQLObjectType({
 name: 'Author',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  age: { type: GraphQLInt },
  books:{
    type: new GraphQLList(BookType),
    resolve(parent, args){
      // return _.filter(books, { authorId:parent.id})
    }
  }
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
    // return _.find(books, {id: args.id})
   }
  },
  author:{
    type: AuthorType,
    args: {id : {type: GraphQLID}},
    resolve(parent, args){
    //  return _.find(authors, {id:args.id})
    } 
  },
  books:{
    type: new GraphQLList(BookType),
    resolve(parent, args){
      return books
    }
  },
  authors:{
    type: new GraphQLList(AuthorType),
    resolve(parent, args){
      return authors
    }
  }
 }
})

module.exports = new GraphQLSchema({
 query: RootQuery
})