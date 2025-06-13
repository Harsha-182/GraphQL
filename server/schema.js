const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt
		, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;
const Book = require('./models/Book');
const Author = require('./models/Author');

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args){
				return Author.findById(parent.authorId)
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		book: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				return Book.findById(parent.id)
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//code to get data from db /other source
				return Book.findById(args.id)
			},
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				console.log("args=========", args)
				return Author.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({})
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {type: GraphQLString},
				age: {type: GraphQLInt}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				})
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				authorId: {type: GraphQLID}
			},
			resolve(parent, args){
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return book.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
