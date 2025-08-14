const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const schema = require('./schema');
const Author = require('./models/Author');
const Book = require('./models/Book');

const uri = "mongodb+srv://harshacelestial:9ToCDEnZ6FhCJPui@cluster1.auosv0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

app.use(cors());

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	tls: true,               // Use TLS (default for Atlas)
	tlsAllowInvalidCertificates: false, 
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

async function insertDummyData() {
  try {
    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});

    // Create authors
    const author1 = new Author({ name: 'Harsha Kumar', age: 34 });
    const author2 = new Author({ name: 'Priya Singh', age: 29 });

    await author1.save();
    await author2.save();

    // Create books
    const book1 = new Book({ name: 'GraphQL Basics', genre: 'Programming', authorId: author1._id });
    const book2 = new Book({ name: 'Mongoose Mastery', genre: 'Database', authorId: author1._id });
    const book3 = new Book({ name: 'React for Beginners', genre: 'Frontend', authorId: author2._id });

    await book1.save();
    await book2.save();
    await book3.save();

    console.log('Dummy data inserted!');
    // process.exit(0); // Exit after completion
  } catch (err) {
    console.error('Error inserting dummy data:', err);
    // process.exit(1);
  }
}

// insertDummyData();

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(7000, () => {
	console.log('Server is running on port 7000');
})