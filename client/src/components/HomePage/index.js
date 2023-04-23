import React from "react"
import TasksContainer from "../TasksContainer"

const HomePage = () => {
	return (
		<div>
			<nav className='navbar'>
				<h3>Kanban board</h3>
			</nav>
			<TasksContainer />
		</div>
	);
};

export default HomePage;
