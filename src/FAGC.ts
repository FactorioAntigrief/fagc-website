import { FAGCWrapper } from "fagc-api-wrapper"
export const FAGC = new FAGCWrapper({
	apiurl: "http://localhost:3000",
	socketurl: "ws://localhost:8000",
	enableWebSocket: false,
})
