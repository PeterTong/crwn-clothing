const INITIAL_STATE = {
	currentUser: null
}

// INITIAL_STATE is default value 
const userReducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: action.playload
			}
		default:
			return state;
	}
}

export default userReducer;