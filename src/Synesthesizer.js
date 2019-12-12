import React from 'react';
import Tone from 'tone';

import Circle from './Circle.js';
import Frequency from './frequency.js';

const synthOpts = {
	"oscillator" : {
		"type" : "pwm",
		"modulationFrequency" : 0.2
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.9,
	}
}

class Synesthesizer extends React.Component {
	constructor(props) {
		super(props);
		const synth = new Tone.Synth().toMaster();
		const transport = Tone.Transport

		this.state = {
			// TODO: Change to 2D to have chords
			bar: Array(4).fill("#ff7f50"),
			synth,
			transport
		}
		this.setBarColor = this.setBarColor.bind(this);
		this.playBar = this.playBar.bind(this);
		this.stopBar = this.stopBar.bind(this);
	}

	setBarColor(event, id) {
		const { transport, bar } = this.state
		const color = event.target.value
		const updatedBar = bar.map((item, index) => {
			if (index !== id) {
				return item
			}
			return color
		})

		this.setState({
			bar: updatedBar
		});
	}

	playBar() {
		const { bar, synth, transport } = this.state
		const notes = bar.map((color) => Frequency.get(color))

		const seq = new Tone.Sequence((time, note) => {
			synth.triggerAttackRelease(note, "10hz", time)
		}, notes, "4n")

		seq.start()
		transport.start()
	}

	stopBar() {
		const { transport } = this.state
		transport.stop()
	}

	render() {
		const { bar } = this.state
		return(
			<div>
			<button onClick={this.playBar}>PLAY</button>
			<button onClick={this.stopBar}>STOP</button>
			<div style={{ display: "flex", flexDirection: "row"}}>
			<Circle id={0} color={bar[0]} onClick={this.setBarColor} />
			<Circle id={1} color={bar[1]} onClick={this.setBarColor} />
			<Circle id={2} color={bar[2]} onClick={this.setBarColor} />
			<Circle id={3} color={bar[3]} onClick={this.setBarColor} />
			</div>
			</div>

		)
	}
}

export default Synesthesizer
