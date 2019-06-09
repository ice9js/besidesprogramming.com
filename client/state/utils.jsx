/**
 * Returns the initial state if current state is undefined
 *
 * @param  {mixed} state
 * @param  {mixed} initialState
 * @return {mixed}
 */
const maybeUseInitialState = ( state, initialState ) => state === undefined ? initialState : state;

/**
 * Creates a reducer function based on the given handlers and initial state
 *
 * @param  {mixed}  initialState
 * @param  {Object} handlers
 * @return {Function}
 */
export const createReducer = ( initialState, handlers ) =>
	( state, action ) => {
		if ( ! handlers[ action.type ] ) {
			return maybeUseInitialState( state, initialState );
		}

		return handlers[ action.type ]( maybeUseInitialState( state, initialState ), action );
	};
