import React, { useState } from "react";
import axios from "axios";

const AddTask = (props) => {
	const { onClick } = props;
	const [task, setTask] = useState("");

	const handleAddTodo = (e) => {
		e.preventDefault();
		axios.post('/', {
			firstName: 'Fred',
			lastName: 'Flintstone'
		}, {
			baseURL: 'http://localhost:4000',
		}
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
		setTask("");
	};
	return (
		// <form className='form__input' onSubmit={handleAddTodo}>
		<button className='btnCreate' onClick={onClick}>+</button>
		// </form>
	);
};

export default AddTask;