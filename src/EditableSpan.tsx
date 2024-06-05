import { ChangeEvent, useState } from 'react'

type Props = {
	oldTitle: string
	changeItem: (oldTitle: string) => void
}
export const EditableSpan = ({ oldTitle, changeItem }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [newTitle, setNewTitle] = useState(oldTitle)

	const activateEditMode = () => {
		setEditMode(!editMode)
		if (editMode && newTitle.trim()) {
			changeItem(newTitle.trim())
		}
	}
	const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(event.currentTarget.value)
	}

	return editMode ? (
		<input
			value={newTitle}
			onBlur={activateEditMode}
			autoFocus
			onChange={changeTitleHandler}
		/>
	) : (
		<span onDoubleClick={activateEditMode}>{oldTitle}</span>
	)
}
