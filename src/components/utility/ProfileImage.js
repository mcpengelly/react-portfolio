import React, { Component } from 'react';

//TODO: load an icon for the external links
export default class ProfileImage extends Component {
	render(){
		return (
			<img src={this.props.source}
				alt="profile"
				style={{
					width: '50%',
					height: '50%',
					borderRadius: '50%'
				}}>
			</img>
		);
	}
};


