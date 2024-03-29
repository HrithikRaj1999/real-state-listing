// authReducer.ts

const initialState: SignUpState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  passwordVisible: false,
};

function reducer(state: SignUpState, action: SignUpAction): SignUpState {
  switch (action.type) {
    case "SET_USER_NAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, passwordVisible: action.payload };
    default:
      return state;
  }
}

export { initialState, reducer };
