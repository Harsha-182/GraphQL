const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const schema = require('./schema/schema');

app.use("/graphql", graphqlHTTP({

}));

app.listen(5000, () => {
	console.log('Server is running on port 5000');
})