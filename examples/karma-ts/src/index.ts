import { sum } from "./sum"

interface Example {
	sum(a: number, b: number): number
	subtract(a: number, b: number): number
	multiply(a: number, b: number): number
}

const multiply = (a: number, b: number) => a * b

function subtract(a: number, b: number): number {
	return a - b
}

export const example: Example = {
	sum(a, b) {
		return sum(a, b)
	},

	subtract(a, b) {
		return subtract(a, b)
	},

	multiply(a, b) {
		return multiply(a, b)
	},
}
