const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express();
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const cors = require('cors')


//cors
app.use(cors())

// mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://muhammed:muhammed1234567@cluster0-hj57y.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('connected to DB'))
  .catch(err => console.log(err))
//middleware for handling graphql requests
//{} takes in the Schema
//a Schema describes what the data on our grapgh will look like.
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const PORT = 4000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))