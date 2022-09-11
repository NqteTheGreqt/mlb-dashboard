const authReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
		case "auth":
			console.log("loggedin: " + action.payload);
			return {
				loggedIn: action.payload
			};
		default:
			return state;
	}
}

export default authReducer;