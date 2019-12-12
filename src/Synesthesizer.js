import React from 'react';
import Tone from 'tone';

import Circle from './Circle.js';
import Frequency from './frequency.js';
//import Library from './library.js';

const BARSIZE = 8
const INITIAL_COLOR = "#444444"

class Synesthesizer extends React.Component {
	constructor(props) {
		super(props);
		// TODO: Load sound from library into synth via UI
		const synth = new Tone.Synth().toMaster();
		const transport = Tone.Transport

		this.state = {
			// TODO: Change to 2D to have chords
			// TODO: Allow to have more than 4 max 16
			bar: Array(BARSIZE).fill(INITIAL_COLOR),
			synth,
			transport
		}
		this.setBarColor = this.setBarColor.bind(this);
		this.playBar = this.playBar.bind(this);
		this.stopBar = this.stopBar.bind(this);
	}

	setBarColor(event, id) {
		const { bar } = this.state
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

		this.setState({
			seq
		});
	}

	stopBar() {
		const { transport, seq = {} } = this.state
		seq.stop()
		transport.stop()
	}

	render() {
		const { bar } = this.state
		return(
			<div>
				<div style={{ justifyContent: "center", display: "flex", flexDirection: "row"}}>
				<button style={{ width: "300px", height: "300px", borderRadius: "10%", fontSize: "xxx-large"}} onClick={this.playBar}>PLAY</button>
				<button style={{ width: "300px", height: "300px", borderRadius: "10%", fontSize: "xxx-large"}} onClick={this.stopBar}>STOP</button>
				</div>
				<div style={{ display: "flex", flexDirection: "row"}}>
				{
					bar.map((color, i) =>
						<Circle key={i} id={i} color={color} onClick={this.setBarColor} />
					)
				}
				</div>
			</div>
		)
	}
}

export default Synesthesizer
