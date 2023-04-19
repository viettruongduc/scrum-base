import React, { useState } from "react";
import axiosService from "../services/axiosService";
import axios from "axios";

const AddTask = ({ socket }) => {
  const [task, setTask] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/", {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }, {}
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    // axiosService.post({
    // 	firstName: 'Fred',
    // 	lastName: 'Flintstone'
    // }, '')
    // 	.then(function (response) {
    // 		console.log(111111, response);
    // 	})
    // 	.catch(function (error) {
    // 		console.log(222222, error);
    // 	});
    // socket.emit("createTask", { task });
    setTask("");
  };
  return (
    <form className='form__input' onSubmit={handleAddTodo}>
      <label htmlFor='task'>Add Todo</label>
      <input
        type='text'
        name='task'
        id='task'
        value={task}
        className='input'
        required
        onChange={(e) => setTask(e.target.value)}
      />
      <button className='addTodoBtn'>ADD TODO</button>
    </form>
  );
};

export default AddTask;
