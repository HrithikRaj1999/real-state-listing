import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Spinner from "../components/Spinner";
import { LABELS } from "../constants/labels";
import useSignIn from "../hooks/useSignIn";
const SignIn = () => {
  const { handleSubmit, handleKeepMeSignIn, loading, state, dispatch } =
    useSignIn();
  return (
    <div className="max-w-sm min-w-fit p-5 mx-auto min-w-sm">
      <h1 className="text-3xl font-bold text-center my-4">Sign In</h1>
      <form
        id="signInForm"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-indigo-50 border-2 hover:border-blue-500 p-3 rounded-lg"
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
            className="bg-indigo-50 border-2 hover:border-blue-500 p-3 w-full rounded-lg"
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
        <div className="flex gap-4 items-center">
          <input
            className="w-4 h-4 rounded-full"
            id="keep-me-sign-in"
            title="keep-me-sign-in"
            type="checkbox"
            onChange={handleKeepMeSignIn}
          />
          <span className="text-sm from-neutral-50">Keep me Sign In</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          {loading ? <Spinner width={40} height={40} /> : "Sign In"}
        </button>
        <GoogleAuth />
      </form>
      <div className="flex  justify-between items-start  flex-wrap my-4 gap-2">
        <div>
          <p className="text-sm text-slate-700">{LABELS.NO_AC}</p>
          <Link className="text-blue-600 font-semibold" to="/signup">
            {LABELS.SIGN_UP}
          </Link>
        </div>

        <Link className="text-sm  text-blue-600 font-semibold" to="/signin">
          <p className="text-slate-700">{LABELS.FORGOT_PASS}</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
