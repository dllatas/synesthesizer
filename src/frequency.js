const LOW_FREQ = 32.70
const HIGH_FREQ = 3952.06
const DIFF_FREQ = HIGH_FREQ - LOW_FREQ
const MAX_DEC_COLOR = 255 * 3
const RATIO = DIFF_FREQ / MAX_DEC_COLOR

const get = (color) => {
	const hex = splitColorIntoHex(color)
	const dec = convertFromHextoDec(hex)

	const freq = dec.reduce((acc, d) => acc + d, 0)
	const sampledFreq = freq * RATIO

	if (sampledFreq < LOW_FREQ) {
		return LOW_FREQ
	}

	if (sampledFreq > HIGH_FREQ) {
		return HIGH_FREQ
	}

	return sampledFreq
}

const splitColorIntoHex = (color) => {
	const hex = []
	const step = 2
	let start = 1
	let end = 3
	while (start < color.length - 1) {
		const c = color.substring(start, end)
		hex.push(c)
		start = start + step
		end = end + step
	}
	return hex
}

const convertFromHextoDec = (hex) => {
	const dec = hex.map(h => parseInt(h, 16))
	return dec
}

export default {
	get
}
