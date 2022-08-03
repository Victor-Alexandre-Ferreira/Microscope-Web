import { Input, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { sendSignup, updateSignupForm } from "../../actions/signupActions";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Header from "../Header/Header";
import { useEffect } from "react";

function SignUpPage() {
  const dispatch = useDispatch();

  const emailSignup = useSelector((state) => state.user.emailSignup);
  const passwordSignup = useSelector((state) => state.user.passwordSignup);
  const confirmPasswordSignup = useSelector(
    (state) => state.user.confirmPasswordSignup
  );
  const username = useSelector((state) => state.user.username);
  const error = useSelector((state) => state.user.error);
  const isSignedUp = useSelector((state) => state.user.isSignedUp);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) navigate("/login");
  }, [isSignedUp]);

  useEffect(() => {
    if (passwordSignup != confirmPasswordSignup) {
      dispatch({
        type: "PASSWORDS_MISMATCH",
        payload: {
          error: true,
        },
      });
    } else {
      dispatch({
        type: "PASSWORDS_MATCH",
        payload: {
          error: false,
        },
      });
    }
  }, [passwordSignup, confirmPasswordSignup]);

  return (
    <div className="signup">
      <Header />
      <form
        className="signup--form flex flex-col md:!mt-44 md:mx-auto md:w-3/5"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(sendSignup());
        }}
      >
        <Input
          className="signup--form-input mb-6"
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={(event) => {
            dispatch(updateSignupForm("username", event.target.value));
          }}
        />
        <Input
          className="signup--form-input mb-6"
          placeholder="Email"
          type="email"
          value={emailSignup}
          onChange={(event) => {
            dispatch(updateSignupForm("emailSignup", event.target.value));
          }}
        />
        <Input
          error={error}
          className="signup--form-input mb-6"
          placeholder="Mot de passe"
          type="password"
          value={passwordSignup}
          onChange={(event) => {
            dispatch(updateSignupForm("passwordSignup", event.target.value));
          }}
        />

        <Input
          error={error}
          className="signup--form-input mb-6"
          placeholder="Confirmer le mot de passe"
          type="password"
          value={confirmPasswordSignup}
          onChange={(event) => {
            dispatch(
              updateSignupForm("confirmPasswordSignup", event.target.value)
            );
          }}
        />

        {/* Submit button is disabled if passwords don't match or if any field is empty */}
        <Button
          disabled={
            error ||
            !username ||
            !emailSignup ||
            !passwordSignup ||
            !confirmPasswordSignup
          }
          className="signup--form-submit !mt-6"
          inverted
          type="submit"
        >
          Inscription
        </Button>
        <p className="signup--form-message mt-3">
          Déja inscrit ?{" "}
          <Link className="text-gray-500 font-semibold" to="/login">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}

// == Export
export default SignUpPage;
