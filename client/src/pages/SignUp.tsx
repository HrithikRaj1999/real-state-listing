import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { LABELS } from "../constants/labels";
import useSignUp from "../hooks/useSignUp";
const SignUp = () => {
  const { handleSubmit, state, dispatch } = useSignUp();
  return (
    <div className="max-w-sm mix-w-fit p-5 mx-auto min-w-sm">
      <h1 className="text-3xl font-bold text-center my-4">Sign Up</h1>
      <form
        id="signUpFrom"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-indigo-50  border p-3 rounded-lg"
          type="text"
          id="username"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USER_NAME", payload: e.target.value })
          }
        />
        <input
          className=" bg-indigo-50  border p-3 rounded-lg"
          type="email"
          id="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
        <div className="relative">
          <input
            className=" bg-indigo-50  border p-3 w-full rounded-lg"
            type={state.passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
          />
          <span
            className="absolute inset-y-0 right-5 flex items-center text-black"
            onClick={() =>
              dispatch({
                type: "TOGGLE_PASSWORD_VISIBILITY",
                payload: !state.passwordVisible,
              })
            }
          >
            {state.passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          disabled={state.error}
          className="bg-slate-900 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          {state.loading ? <Spinner width={7} height={7} /> : LABELS.SIGN_UP}
        </button>
      </form>
      <div className="my-4 gap-3">
        <p className="text-slate-700">{LABELS.YES_AC}</p>
        <Link className="text-blue-600 font-semibold" to="/signin">
          {LABELS.SIGN_IN}
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
