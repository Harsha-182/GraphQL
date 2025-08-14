const AddBook = () => {
	const displayAuthors = () => {
		
	}
	return(
		<div>
			<form>
				<div>
					<label>Book name:</label>
					<input type="text"/>
				</div>

				<div>
					<label>Genre:</label>
					<input type="text"/>
				</div>

				<div>
					<label>Author:</label>
					<select>
						<option>Select author</option>
					</select>
				</div>

				<button>+</button>
			</form>
		</div>
	)
}

export default AddBook