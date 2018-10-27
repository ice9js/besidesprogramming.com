/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { filter, omit } from 'lodash';

const Controls = ( props ) => {
	const Element = props.disabled ? 'button' : 'a';

	const ommittedProps = filter( [
		'icon',
		'label',
		props.disabled && 'href',
		! props.disabled && 'disabled',
	] );

	return (
		<Element { ...omit( props, ommittedProps ) }>
			{ props.icon }
			<span className="sr-only">{ props.label }</span>
		</Element>
	);
};

Controls.propTypes = {
	disabled: PropTypes.bool,
	href: PropTypes.string,
	icon: PropTypes.element.isRequired,
	label: PropTypes.string.isRequired,
};

export default Controls;
