import { LABELS } from "../constants/labels";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const GoogleAuth = () => {
  const { handleGoogleAuth } = useGoogleAuth();
  return (
    <button
      id="google-signIn-btn"
      type="button"
      className="bg-red-700 text-white rounded-lg p-2 hover:opacity-90"
      onClick={handleGoogleAuth}
    >
      {LABELS.GOOGLE_LOGIN}
    </button>
  );
};

export default GoogleAuth;
