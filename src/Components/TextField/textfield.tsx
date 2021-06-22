import React, { ChangeEventHandler, ReactElement } from "react"
import { getRandomElement } from "../../functions"
import "./textfield.css"
import { TextField as MaterialTextField } from "@material-ui/core"
import { TextFieldProps } from "@material-ui/core"

interface SearchBarProps {
	placeholders: string[] | (() => string)
	onSearchChange: (evt: any) => void
	inputRef: React.RefObject<HTMLInputElement>
}

export default function CustomTextField(props: SearchBarProps & Omit<TextFieldProps, "inputRef">): ReactElement {
	setInterval(() => {
		const element = props.inputRef.current
		if (!element || element.disabled) return
		element.placeholder = Array.isArray(props.placeholders) ? getRandomElement(props.placeholders) : props.placeholders()
	}, 2500)
	return (
		<MaterialTextField
			placeholder={
				Array.isArray(props.placeholders) ? getRandomElement(props.placeholders) : props.placeholders()
			}
			inputRef={props.inputRef}
			onChange={props.onSearchChange}
		/>
	)
}