import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField, OutlinedInput } from '@mui/material'
import Select from "react-select";


import Modal from 'react-modal';
import AddTask from "./AddTask";
//add somethin

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '800px'
	},
};

const statusData = [
	{ value: "pending", label: "Pending" },
	{ value: "ongoing", label: "Ongoing" },
	{ value: "completed", label: "Completed" },
	{ value: "indevelopment", label: "In development" },
	{ value: "liveinbuild", label: "Live in build" }
]

// Modal.setAppElement('#yourAppElement');


const TasksContainer = () => {
	const fetchID = () => Math.random().toString(36).substring(2, 10);
	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
	let tasks = {
		pending: {
			title: "pending",
			items: [
				{
					id: fetchID(),
					title: "Send the Figma file to Dima",
					comments: [],
				},
			],
		},
		ongoing: {
			title: "ongoing",
			items: [
				{
					id: fetchID(),
					title: "Review GitHub issues",
					comments: [
						{
							name: "David",
							text: "Ensure you review before merging",
							id: fetchID(),
						},
					],
				},
			],
		},
		completed: {
			title: "completed",
			items: [
				{
					id: fetchID(),
					title: "Create technical contents",
					comments: [
						{
							name: "Dima",
							text: "Make sure you check the requirements",
							id: fetchID(),
						},
					],
				},
			],
		},
		inDevelopment: {
			title: "indevelopment",
			items: [
				{
					id: fetchID(),
					title: "Catelina update",
					comments: [
						{
							name: "SomeThing ",
							text: "Someone",
							id: fetchID(),
						},
					],
				},
			],
		},
		liveInBuild: {
			title: "liveinbuild",
			items: [
				{
					id: fetchID(),
					title: "Catelina live in build",
					comments: [
						{
							name: "SomeThing live in build ",
							text: "Someone live in build ",
							id: fetchID(),
						},
					],
				},
			],
		},
	};



	const [data, setData] = useState()
	const tempTasks = []
	// const [tasks, setTasks] = useState([])

	const pendingObject = {
		title: "pending",
		items: []
	}
	const pendingArray = ['pending']

	const onGoingObject = {
		title: "ongoing",
		items: []
	}

	const onGoingArray = ['ongoing']

	const completedObject = {
		title: "completed",
		items: []
	}

	const completedArray = ['completed']

	const openModal = () => {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}


	const handleDragEnd = ({ destination, source }) => {
		if (!destination) return;
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		)
			return;

		// socket.emit("taskDragged", {
		// 	source,
		// 	destination,
		// });
	};

	// const fetchTasks = async () => {
	// 	const result = await axios.get('http://localhost:4000/')
	// 	setData(result?.data)
	// }


	// useEffect(() => {
	// 	fetchTask();

	// }, []);

	// useEffect(() => {
	// 	console.log(!data);
	// 	if (data) {
	// 		const pending = data?.filter(task => task.title === "pending");
	// 		const onGoing = data?.filter(task => task.title === "ongoing");
	// 		const completed = data?.filter(task => task.title === "completed");

	// 		pending.forEach(task => pendingObject.items.push(task.items))
	// 		onGoing.forEach(task => onGoingObject.items.push(task.items))
	// 		completed.forEach(task => completedObject.items.push(task.items))

	// 		pendingArray.push(pendingObject)
	// 		onGoingArray.push(onGoingObject)
	// 		completedArray.push(completedObject)
	// 		tempTasks.push(pendingArray, onGoingArray, completedArray)

	// 	}
	// 	console.log("tempTasks: ", tempTasks);
	// 	setTasks(tempTasks)


	// }, [data])

	const value = {
		pending: {
			title: "pending",
			items: [
				{
					id: fetchID(),
					title: "Send the Figma file to Dima",
					comments: [],
				},
			],
		},
		// ongoing: {
		// 	title: "ongoing",
		// 	items: [
		// 		{
		// 			id: fetchID(),
		// 			title: "Review GitHub issues",
		// 			comments: [
		// 				{
		// 					name: "David",
		// 					text: "Ensure you review before merging",
		// 					id: fetchID(),
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// completed: {
		// 	title: "completed",
		// 	items: [
		// 		{
		// 			id: fetchID(),
		// 			title: "Create technical contents",
		// 			comments: [
		// 				{
		// 					name: "Dima",
		// 					text: "Make sure you check the requirements",
		// 					id: fetchID(),
		// 				},
		// 			],
		// 		},
		// 	],
		// },
	}

	// console.log('object', Object.entries(value))

	// console.log(22222, tasks)

	return (
		<div className='container'>
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(tasks).map((task) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{task[1].title} Tasks</h3>
						<div className={`${task[1].title.toLowerCase()}__container`}>
							<Droppable droppableId={task[1].title}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{task[1].items.map((item, index) => (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={`${task[1].title.toLowerCase()}__items`}
													>
														<label className="iosLabel">iOS</label>
														<p className='title'>{item.title}</p>
														<p className='comment'>
															<Link
																to={`/comments/${task[1].title}/${item.id}`}
															>
																{item?.comments?.length > 0
																	? `View Comments`
																	: "Add Comment"}
															</Link>
														</p>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

						</div>

						<div className="addTask">
							<AddTask onClick={openModal} />
						</div>
					</div>

				))}
			</DragDropContext>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a task</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="formInline">
						<label className="label">Title</label>
						{/* <input {...register("title", { required: true })} /> */}
						<TextField name="title"  {...register("title", { required: true })} style={{ width: '100%' }} />
					</div>
					{errors.title && <span className="errorMessage">This field is required</span>}
																
					<div className="formInline">
						<label className="label">Status</label><br />
						{/* <input type="" {...register("status", { required: true })} /> */}
						{/* <select name="status" id="status" className="selectOption">
							<option value="pending">Pending</option>
							<option value="ongoing">Ongoing</option>
							<option value="completed">Completed</option>
							<option value="indevelopment">In development</option>
							<option value="liveinbuild">Live in build</option>
						</select> */}

						{/* <Controller
							name="status"
							control={control}
							render={({ field }) => <Select
								{...field}
								className="selectOption"
								styles={{ height: '51px' }}
								options={[
									{ value: "pending", label: "Pending" },
									{ value: "ongoing", label: "Ongoing" },
									{ value: "completed", label: "Completed" },
									{ value: "indevelopment", label: "In development" },
									{ value: "liveinbuild", label: "Live in build" }
								]}
							/>}
						/> */}

						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={statusData}
							sx={{ width: 300 }}
							renderInput={(params) => <TextField {...params} />}
						/>

						<label className="label">Deadline</label><br />
						<input type="date" {...register("deadline", { required: true })} />

					</div>

					<div className="formInline">
						{errors.status && <span className="errorMessage">This field is required</span>}
						{errors.deadline && <span className="errorMessage">This field is required</span>}
					</div>


					<div style={{ display: 'flex' }}>
						<label className="label">Device</label><br />
						<select {...register("device", { required: true })} name="device" id="device" className="selectOption">
							<option value="ios">iOS</option>
							<option value="android">Android</option>
							<option value="desktop">Desktop</option>
							<option value="web">Web</option>
						</select>

						<label className="label">Label</label><br />
						<input {...register("label", { required: true })} />
					</div>

					<div className="formInline">
						{errors.device && <span className="errorMessage">This field is required</span>}
						{errors.label && <span className="errorMessage">This field is required</span>}
					</div>

					<div style={{ display: 'flex' }}>
						<label>Link</label><br />
						<input {...register("link", { required: true })} />
					</div>
					{errors.link && <span className="errorMessage">This field is required</span>}

					<input type="submit" />
				</form>
			</Modal>
		</div>
	);
};

export default TasksContainer;
