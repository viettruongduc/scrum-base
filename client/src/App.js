import { Route, Routes } from "react-router-dom";
import Task from "./components/Task";

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Task />} />
			</Routes>
		</div>
	);
}

export default App;
