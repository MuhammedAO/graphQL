const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express();

const PORT = 4000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))