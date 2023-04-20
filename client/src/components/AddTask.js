import React from "react";

const AddTask = (props) => {
	const { onClick } = props;

	return (
		<button className='btnCreate' onClick={onClick}>+</button>
	);
};

export default AddTask;