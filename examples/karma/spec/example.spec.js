import { example } from "../src/index"

describe("index.js", () => {
	describe("#sum", () => {
		it("should exist the moving property", () => {
			const result = example.sum(2, 3)
			result.should.equal(5)
		})
	})
})
