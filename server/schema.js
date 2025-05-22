const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;

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

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
	})
});

const RootQuery = new  GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				console.log("args:===========", args);
				//code to get data from db /other source
				return _.find(book, {id: args.id});
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
});
