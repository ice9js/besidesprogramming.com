/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PageMeta extends PureComponent {

	static propTypes = {
		title: PropTypes.string.isRequired,
	};

	componentDidMount() {
		this.updateMeta();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.title === prevProps.title ) {
			return;
		}

		this.updateMeta();
	}

	updateMeta() {
		if ( ! this.props.title ) {
			return;
		}

		window.document.title = this.props.title;
	}

	render() {
		return null;
	}
}

export default PageMeta;
