import React, { Component, ReactElement } from "react"
import "./App.css"
import { FAGCWrapper } from "fagc-api-wrapper"
// import Layout from "./Components/Layout/layout"
import Navbar from "./Components/Navbar/navbar"
import Reports from "./Pages/Reports"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import { createBrowserHistory } from "history"

// const customHistory = createBrowserHistory()

class App extends Component {
	fagc: FAGCWrapper
	constructor(props: Record<string, never>) {
		super(props)
		this.fagc = new FAGCWrapper({
			apiurl: "http://localhost:3000/v1",
			socketurl: "ws://localhost:8000",
			enableWebSocket: false
		})
	}
	render(): ReactElement {
		return (
			// <Router>
			// 	<Navbar pages={["Reports"]}/>
			// 	<Switch>
			// 		<Route exact path="/" component={Reports} />
			// 		<Route path="/Reports" component={Reports} />
			// 	</Switch>
			// </Router>
			<Reports FAGC={this.fagc}/>
		)
	}
}

export default App
