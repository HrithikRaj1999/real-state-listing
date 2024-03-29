// authReducer.ts

const initialState: State = {
  email: "",
  password: "",
  passwordVisible: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };

    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, passwordVisible: action.payload };
    default:
      return state;
  }
}

export { initialState, reducer };
