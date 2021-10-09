import { Report } from 'fagc-api-types'
import React, { useEffect, useState } from 'react'
import { FAGC } from '../../FAGC'
import ReportComponent from "./report"
import {Button} from "@mui/material"


interface HiddenReportProps {
	id: string
	withProfileData?: boolean
}

const HiddenReportComponent: React.FC<HiddenReportProps> = ({id, withProfileData=true}: HiddenReportProps) => {
	const [enabled, setEnabled] = useState(false)

	return (
		<div>
			{!enabled && <Button
				variant="contained"
				onClick={() => setEnabled(true)} 
			>View report with ID {id}</Button>}
			{enabled && <>
				<Button
					variant="contained"
					onClick={() => setEnabled(false)} 
				>Hide report with ID {id}</Button>
				<ReportComponent id={id} withProfileData={withProfileData}/>
			</>}
		</div>
	)
}
export default HiddenReportComponent
