const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

const book = [
	{id: '1', name: 'Money-Heist', genre: 'Thriller'},
	{id: '2', name: 'Breaking Bad', genre: 'Drama'},
	{id: '3', name: 'Game of Thrones', genre: 'Fantasy'},
	{id: '4', name: 'The Witcher', genre: 'Fantasy'},
	{id: '5', name: 'The Office', genre: 'Comedy'},
	{id: '6', name: 'Stranger Things', genre: 'Sci-Fi'},
	{id: '7', name: 'The Crown', genre: 'Drama'},
	{id: '8', name: 'The Mandalorian', genre: 'Sci-Fi'},
]

const author = [
	{id: '1', name: 'Alex', age: 25},
	{id: '2', name: 'John', age: 30},
	{id: '3', name: 'Jane', age: 28},
	{id: '4', name: 'Mary', age: 35},
	{id: '5', name: 'Tom', age: 40},
	{id: '6', name: 'Jerry', age: 22},
	{id: '7', name: 'Bob', age: 27},
	{id: '8', name: 'Alice', age: 32},
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt}
	})
});

const RootQuery = new  GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//code to get data from db /other source
				return _.find(book, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				return _.find(author, {id: args.id})
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
});
