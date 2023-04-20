import React from "react";
import socketIO from "socket.io-client";

import TasksContainer from "./TasksContainer";
import Nav from "./Nav";
import AddTask from "./AddTask";


const Task = () => {
	return (
		<div>
			<Nav />
			<TasksContainer />
		</div>
	);
};

export default Task;
