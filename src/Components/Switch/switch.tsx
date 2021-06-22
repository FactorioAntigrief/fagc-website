import React, { ReactElement } from "react"
import Switch, { SwitchProps } from "@material-ui/core/Switch"

export default function CustomSwitch(props: SwitchProps): ReactElement {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked })
		if (props.onChange) props.onChange(event, event.target.checked)
	}

	return (
		<Switch
			checked={state.checkedB}
			onChange={handleChange}
			color="primary"
			name="checkedB"
			inputProps={{ "aria-label": "primary checkbox" }}
		/>
	)
}