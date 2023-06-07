import { LOGIN, LOGOUT } from "./userDefinedActions.js";
const states = (state:StateType = {}, action:any) => {
  console.log("in action",action)

  switch (action.type) {
    case LOGIN:
    return {
        ...state,
        user: {
          _id: action.payload._id,
          email: action.payload.email,
          username: action.payload.username,
        },
      };

    case LOGOUT: {
      delete state["user"];
      return { ...state };
    }
    default:
      return state;
  }
};

export default states;
