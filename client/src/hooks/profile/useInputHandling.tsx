import { useReducer } from "react";
import { Eye, EyeOff } from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { initialState, reducer } from "../../util/signUpReducer";

export const useInputHandling = (
  formData: FormDataType | null,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>,
) => {
  const { loading, error } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const passwordShowIcon = state.passwordVisible ? (
    <EyeOff size={20} />
  ) : (
    <Eye size={20} />
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: FormDataType | null) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };
  const handlePassView = () =>
    dispatch({
      type: "TOGGLE_PASSWORD_VISIBILITY",
      payload: !state.passwordVisible,
    });

  return {
    state,
    loading,
    error,
    dispatch,
    passwordShowIcon,
    handleInputChange,
    handlePassView,
  };
};
