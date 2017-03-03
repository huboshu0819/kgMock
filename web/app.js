import {
	render
} from 'react-dom';

import React, {
	Component,
} from 'react';


class Hello extends Component{
	render() {
		return (
			<div>
				<h1>hahahah</h1>
			</div>
		);
	}
}

render(<Hello />, document.getElementById('hello'));