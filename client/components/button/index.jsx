/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

const Button = ( props ) => {
	const ButtonElement = props.href ? 'a' : 'button';
	const buttonClass = classNames( 'button', props.className );
	const buttonProps = omit( props, [ 'children', 'className' ] );

	return (
		<ButtonElement className={ buttonClass } { ...buttonProps }>
			{ props.children }
		</ButtonElement>
	);
};

export default Button;
