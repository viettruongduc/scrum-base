import React, { useState, useEffect } from "react"
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import AddTask from "./AddTask"
import Form from "./Form"

const baseURL = process.env.REACT_APP_BASE_URL

const TasksContainer = () => {
	const [modalIsOpen, setIsOpen] = useState(false)
	const [data, setData] = useState()
	const tempTasks = []
	const [tasks, setTasks] = useState([])
	const [taskSelected, setTaskSelected] = useState()

	const pendingArray = ['pending']
	const onGoingArray = ['ongoing']
	const completedArray = ['completed']
	const inDevelopmentArray = ['inDevelopment']
	const liveInBuildArray = ['liveInBuild']

	const pendingObject = {
		title: "pending",
		items: []
	}
	const onGoingObject = {
		title: "ongoing",
		items: []
	}
	const completedObject = {
		title: "completed",
		items: []
	}
	const inDevelopmentObject = {
		title: "inDevelopment",
		items: []
	}
	const liveInBuildObject = {
		title: "liveInBuild",
		items: []
	}

	const onAddTask = (title) => {
		setTaskSelected(title)
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
	}

	const handleDragEnd = async (result) => {
		const { source, destination, draggableId } = result

		if (!destination) return
		if (destination.index === source.index && destination.droppableId === source.droppableId) return

		const taskSelected = tasks.filter((task) => task[0] === source.droppableId)
		const taskDestination = tasks.filter((task) => task[0] === destination.droppableId)
		const itemSelected = taskSelected[0][1].items[source.index]

		taskSelected[0][1].items.splice(source.index, 1)
		taskDestination[0][1].items.splice(destination.index, 0, itemSelected)

		await axios.patch(baseURL, { id: draggableId, title: destination.droppableId })
	}

	const fetchTasks = async () => {
		const result = await axios.get(baseURL)
		setData(result?.data)
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	useEffect(() => {
		if (data) {
			const pending = data?.filter(task => task.title === "pending")
			const onGoing = data?.filter(task => task.title === "ongoing")
			const completed = data?.filter(task => task.title === "completed")
			const inDevelopment = data?.filter(task => task.title === "inDevelopment")
			const liveInBuild = data?.filter(task => task.title === "liveInBuild")

			pending.forEach(task => pendingObject.items.push(task.items))
			onGoing.forEach(task => onGoingObject.items.push(task.items))
			completed.forEach(task => completedObject.items.push(task.items))
			inDevelopment.forEach(task => inDevelopmentObject.items.push(task.items))
			liveInBuild.forEach(task => liveInBuildObject.items.push(task.items))

			pendingArray.push(pendingObject)
			onGoingArray.push(onGoingObject)
			completedArray.push(completedObject)
			inDevelopmentArray.push(inDevelopmentObject)
			liveInBuildArray.push(liveInBuildObject)
			tempTasks.push(pendingArray, onGoingArray, completedArray, inDevelopmentArray)
		}
		setTasks(tempTasks)

	}, [data])

	return (
		<div className='container'>
			<DragDropContext onDragEnd={handleDragEnd}>
				{tasks?.map((task) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{task[1].title} Task</h3>
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
														<label className={`deviceLabel ${item.device}`}>{item.device}</label>
														<div className="titleWrapper">
															<p className='title'>{item.title}</p>
															<p className="deadline">{item.deadline}</p>
														</div>
														<div className="linkWrapper">
															<img src="/assets/icons/notion.svg" alt="img"></img>&nbsp;
															<a className='link' href={item.link} target="_blank" rel="noreferrer">Document link </a>
														</div>
														<div className="linkWrapper">
															<img src="/assets/icons/venus.svg" alt="img"></img>&nbsp;
															<p className="labelText">{item.label}</p>
														</div>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div className="addTaskWrapper">
								<AddTask onClick={() => onAddTask(task[1].title)} />
							</div>
						</div>
					</div>

				))}
			</DragDropContext>
			<Form
				modalIsOpen={modalIsOpen}
				onRequestClose={closeModal}
				fetchTasks={fetchTasks}
				taskSelected={taskSelected}
			/>
		</div>
	)
}

export default TasksContainer
