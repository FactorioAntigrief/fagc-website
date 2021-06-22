import React, { Fragment, ReactElement, useRef } from "react"
import CustomSwitch from "../Switch/switch"
import CustomTextField from "../TextField/textfield"

interface TextFieldSwitchProps {
	onSearchChange: (evt: any) => void
	TextFieldPlaceholders: string[] | (() => string)
}

export default function TextFieldWithSwitch(props: TextFieldSwitchProps): ReactElement {
	const TextFieldRef = useRef<HTMLInputElement>(null)
	return (
		<div>
			<CustomTextField
				placeholders={props.TextFieldPlaceholders}
				onSearchChange={props.onSearchChange}
				inputRef={TextFieldRef}
			/>
			<CustomSwitch onChange={(_, enabled) => {
				if (TextFieldRef.current) TextFieldRef.current.disabled = !enabled
			}}/>
		</div>
	)
}