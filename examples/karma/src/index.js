import { sum } from "./sum"

const multiply = (a, b) => a * b

export const example = {
	sum(a, b) {
		return sum(a, b)
	},

	subtract(a, b) {
		return a - b
	},

	multiply(a, b) {
		return multiply(a, b)
	},
}
