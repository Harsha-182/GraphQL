import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:7000/graphql',
	cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client = {client}>
		<div className="App">
			<h1>Ninja's Hunting class</h1>
			<BookList/>
			<AddBook/>
		</div>
	</ApolloProvider>
  );
}

export default App;
