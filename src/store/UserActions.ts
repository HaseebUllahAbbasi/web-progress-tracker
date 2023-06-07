import { AppDispatch } from ".";
import { LOGIN, LOGOUT } from "./userDefinedActions";
import { Action } from "redux";

type LoginAction = Action<typeof LOGIN> & {
  payload: {
    _id: string;
    email: string;
    username: string;
  };
};

type LogoutAction = Action<typeof LOGOUT>;

export const LoginUser = (_id: string, email: string, username: string) => async (dispatch: AppDispatch) => {
  console.log("In the start of dispatch");
  const action: LoginAction = {
    type: LOGIN,
    payload: { _id, email, username },
  };
   dispatch(action);

};

export const LogoutUser = () => async (dispatch: AppDispatch) => {
  const action: LogoutAction = { type: LOGOUT };
  dispatch(action);
};
