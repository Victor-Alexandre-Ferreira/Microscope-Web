import { Link } from "react-router-dom";
import LogoWhite from "../../assets/LogoWhite.svg";
import "./Header.scss";

function Header() {
  return (
    <header className="header mt-8 mb-20 flex flex-col md:flex-row">
      <Link className="header--link" to="/">
        <img
          src={LogoWhite}
          className="header--logo mt-6 w-36 mx-auto md:w-32"
          alt="logo"
        />
      </Link>
      <h1 className="mx-auto text-4xl md:self-end md:ml-0">microscope web</h1>
    </header>
  );
}

export default Header;
