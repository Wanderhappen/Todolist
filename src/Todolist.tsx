import { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { FilterValuesType, TaskType } from './App'
import { Button } from './Button'
import { EditableSpan } from './EditableSpan'

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (
		taskId: string,
		taskStatus: boolean,
		todolistId: string
	) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTaskTitle: (
		todolistId: string,
		taskId: string,
		newTitle: string
	) => void
	changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		changeTaskTitle,
		changeTodolistTitle,
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		// changeFilter(filter, props.todolistId)
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskHandler = (title: string) => {
		addTask(title, todolistId)
	}

	const changeTodolistTitleHandler = (newValue: string) => {
		// changeTodolistTitle(todolistId, newValue
		changeTodolistTitle(todolistId, newValue)
	}

	const changeTaskTitleHandler = (newTitle: string, taskId: string) => {
		changeTaskTitle(todolistId, taskId, newTitle)
	}

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan
						oldTitle={title}
						changeItem={changeTodolistTitleHandler}
					/>
				</h3>
				<Button title={'x'} onClick={removeTodolistHandler} />
			</div>
			<AddItemForm addItem={addTaskHandler} />
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(task => {
						const removeTaskHandler = () => {
							removeTask(task.id, todolistId)
						}

						const changeTaskStatusHandler = (
							e: ChangeEvent<HTMLInputElement>
						) => {
							const newStatusValue = e.currentTarget.checked
							changeTaskStatus(task.id, newStatusValue, todolistId)
						}

						return (
							<li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input
									type='checkbox'
									checked={task.isDone}
									onChange={changeTaskStatusHandler}
								/>
								{/*<span>{task.title}</span>*/}
								<EditableSpan
									oldTitle={task.title}
									changeItem={(oldTitle: string) =>
										changeTaskTitleHandler(oldTitle, task.id)
									}
								/>
								<Button onClick={removeTaskHandler} title={'x'} />
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button
					className={filter === 'all' ? 'active-filter' : ''}
					title={'All'}
					onClick={() => changeFilterTasksHandler('all')}
				/>
				<Button
					className={filter === 'active' ? 'active-filter' : ''}
					title={'Active'}
					onClick={() => changeFilterTasksHandler('active')}
				/>
				<Button
					className={filter === 'completed' ? 'active-filter' : ''}
					title={'Completed'}
					onClick={() => changeFilterTasksHandler('completed')}
				/>
			</div>
		</div>
	)
}
