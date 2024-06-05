import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import './App.css'
import { Todolist } from './Todolist'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
		}
		setTasks(newTodolistTasks)
	}

	const changeTaskStatus = (
		taskId: string,
		taskStatus: boolean,
		todolistId: string
	) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, isDone: taskStatus } : t
			),
		}
		setTasks(newTodolistTasks)
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const newTodolists = todolists.map(tl => {
			return tl.id === todolistId ? { ...tl, filter } : tl
		})
		setTodolists(newTodolists)
	}

	const removeTodolist = (todolistId: string) => {
		const newTodolists = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(newTodolists)
		delete tasks[todolistId]
		setTasks({ ...tasks })
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title,
			isDone: false,
		}
		const newTodolistTasks = {
			...tasks,
			[todolistId]: [newTask, ...tasks[todolistId]],
		}
		setTasks(newTodolistTasks)
	}

	const addTodolist = (title: string) => {
		const id = v1()
		const newTodolist: TodolistType = { id: id, title: title, filter: 'all' }
		setTodolists([newTodolist, ...todolists])
		setTasks({ ...tasks, [id]: [] })
	}

	const changeTaskTitle = (
		todolistId: string,
		taskId: string,
		newTitle: string
	) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(task =>
				task.id === taskId ? { ...task, title: newTitle } : task
			),
		})
	}

	const changeTodolistTitle = (todolistId: string, title: string) => {
		setTodolists(
			todolists.map(td => (td.id === todolistId ? { ...td, title } : td))
		)
	}

	return (
		<div className='App'>
			<AddItemForm addItem={addTodolist} />
			{todolists.map(tl => {
				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return (
					<Todolist
						key={tl.id}
						todolistId={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
						changeTaskTitle={changeTaskTitle}
						changeTodolistTitle={changeTodolistTitle}
					/>
				)
			})}
		</div>
	)
}

export default App
