const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express();
const schema = require('./schema/schema')

//middleware for handling graphql requests
//{} takes in the Schema
//a Schema describes what the data on our grapgh will look like.
app.use('/graphql', graphqlHTTP({
 schema
}))

const PORT = 4000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))