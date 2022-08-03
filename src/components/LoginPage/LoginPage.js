import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendLogin, updateLoginForm } from "../../actions/loginActions";
import { Form, Button, Message } from "semantic-ui-react";
import "./LoginPage.css";
import { useEffect } from "react";
import Header from "components/Header/Header";
// import SecondaryHeader from "components/SecondaryHeader/SecondaryHeader";

function LoginPage() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const isConnected = useSelector((state) => state.user.isConnected);
  const loginError = useSelector((state) => state.user.loginError);
  const navigate = useNavigate();
  console.log("username vide ", username);

  useEffect(() => {
    if (isConnected) navigate("/");
  }, [isConnected]);

  return (
    <div className="login">
      {/* <SecondaryHeader /> */}
      <Header />
      <Form
        error={loginError}
        className="login--form md:!mt-44 md:mx-auto md:w-3/5"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(sendLogin());
        }}
      >
        <Message error header="Erreur de connexion :" content={loginError} />
        <Form.Input
          className="login--form--input !mb-6"
          placeholder="Nom d'utilisateur"
          type="text"
          value={username || ""}
          onChange={(event) => {
            dispatch(updateLoginForm("username", event.target.value));
          }}
        />
        <Form.Input
          className="login--form--input !mb-6"
          placeholder="Mot de passe"
          type="password"
          value={password || ""}
          onChange={(event) => {
            dispatch(updateLoginForm("password", event.target.value));
          }}
        />
        <Button
          inverted
          className="login--form--submit !mt-6 w-full"
          type="submit"
        >
          Connexion
        </Button>
        <p className="login--form-message mt-3">
          Pas de compte ?{" "}
          <Link className="text-gray-500 font-semibold" to="/signup">
            Inscrivez-vous
          </Link>
        </p>
      </Form>
    </div>
  );
}

// == Export
export default LoginPage;
