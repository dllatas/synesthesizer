import React from 'react';

const getStyle = (props) => ({
   padding:"100%",
   display:"inline-block",
   backgroundColor: props.color,
   borderRadius: "50%",
   width:50,
   height:50,
})

class Circle extends React.Component {
	render() {
		const { id, color, onClick } = this.props
return (
		<div style={{
			width: "50px",
			height: "50px",
			margin: "60px"
		}}>
		<input
			type="color"
			style={getStyle({ color: color })}
			onChange={ (e) => onClick(e, id) }
		/>
		</div>
	)
	}

}

export default Circle
