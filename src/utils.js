const targetDate = new Date("2024-08-03T15:00:00+02:00") // Date and time in Norway timezone

export function updateCountdown() {
	const now = new Date()
	const diff = targetDate - now

	console.log("test now", now)
	console.log("test targetDate", targetDate)

	let output = ""
	if (diff > 7 * 24 * 60 * 60 * 1000) {
		// More than 7 days left
		const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000))
		const weeks = Math.floor(
			(diff % (30 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)
		)
		const days = Math.floor(
			(diff % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
		)
		output = `| ${months} Month${months !== 1 ? "s" : ""} | ${weeks} Week${
			weeks !== 1 ? "s" : ""
		} | ${days} Day${days !== 1 ? "s" : ""} |`
	} else if (diff > 24 * 60 * 60 * 1000) {
		// More than 24 hours left
		const days = Math.floor(diff / (24 * 60 * 60 * 1000))
		const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
		const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
		output = `| ${days} Day${days !== 1 ? "s" : ""} | ${hours} Hour${
			hours !== 1 ? "s" : ""
		} | ${minutes} Minute${minutes !== 1 ? "s" : ""} |`
	} else {
		// Less than 24 hours left
		const hours = Math.floor(diff / (60 * 60 * 1000))
		const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
		const seconds = Math.floor((diff % (60 * 1000)) / 1000)
		output = `| ${hours} Hour${hours !== 1 ? "s" : ""} | ${minutes} Minute${
			minutes !== 1 ? "s" : ""
		} | ${seconds} Second${seconds !== 1 ? "s" : ""} |`
	}

	console.log("output: ", output)

	return output
}

