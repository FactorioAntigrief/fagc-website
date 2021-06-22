import ObjectID from "bson-objectid"
import { ApiID } from "fagc-api-wrapper"

export function validURL(str: string): boolean {
	const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", "i") // fragment locator
	return !!pattern.test(str)
}

export function getRandomElement<K>(arr: Array<K>): K {
	return arr[Math.floor(Math.random() * arr.length)]
}

const generateRandomHexString = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")

export function getRandomApiID(): ApiID {
	// https://github.com/oof2win2/fagc-backend/blob/d22950bab5e6b1ac482eb94b6679bc551d2c747a/src/utils/functions-databaseless.js#L6-L12
	const string = new ObjectID(generateRandomHexString(12)).toHexString()
	const startBuf = Buffer.alloc(2, string.slice(2, 6), "hex")
	const endBuf = Buffer.alloc(3, string.slice(18), "hex")
	const start = startBuf.toString("base64").slice(0, -1) // remove first char as doesn't change often enough, last two and == as those change too often
	const end = endBuf.toString("base64")
	return (start + end) as ApiID
}