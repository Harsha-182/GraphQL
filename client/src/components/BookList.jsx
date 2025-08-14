import { gql, useQuery } from "@apollo/client";


const getBooksQuery = gql`
{
	books {
		id
		name
		genre
	}
}`

function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	if (!data || !data.books) return <p>No books found</p>;

  return (
    <div>
      {data.books.map((book) => (
		<div key={book.id} >
			<h2>{book.name}</h2>
			<p>Genre: {book.genre}</p>
			<p>ID: {book.id}</p>
		</div>
	  ))}
    </div>
  );
}

export default BookList;