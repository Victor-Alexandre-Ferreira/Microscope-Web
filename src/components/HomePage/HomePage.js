/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomePageLinks from "./HomePageLinks/HomePageLinks";
import ScrollDown from "../../assets/ScrollDown.svg";
import { actionLogout } from "../../actions/loginActions";
import { requestGameId } from "requests";
import { clearGame } from "actions/gameActions";
import { useEffect } from "react";
import "./HomePage.css";
// import shadow from "../../assets/parallax/Shadow.svg";
// import space from "../../assets/parallax/space2.svg";
// import moon from "../../assets/parallax/Moon.svg";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });
  const isConnected = useSelector((state) => state.user.isConnected);
  // const gameId = useSelector((state) => state.game.gameId);

  //parallax
  useEffect(() => {
    isDesktop &&
      (function () {
        // Add event listener
        document.addEventListener("mousemove", parallax);
        const elem = document.querySelector(".home");
        // Magic happens here
        function parallax(e) {
          let _w = window.innerWidth / 2;
          let _h = window.innerHeight / 2;
          let _mouseX = e.clientX;
          let _mouseY = e.clientY;
          let _depth1 = `${50 - (_mouseX - _w) * -0.01}% ${
            50 - (_mouseY - _h) * -0.01
          }%`;
          let _depth2 = `${30 - (_mouseX - _w) * 0.01}% ${
            30 - (_mouseY - _h) * 0.01
          }%`;
          let _depth3 = `${30 - (_mouseX - _w) * 0.02}% ${
            30 - (_mouseY - _h) * 0.02
          }%`;
          let x = `${_depth3}, ${_depth2}, ${_depth1}`;
          // console.log(x);
          elem.style.backgroundPosition = x;
        }
      })();
  }, []);

  const handleCreatelobby = async () => {
    dispatch(clearGame());

    const result = await requestGameId(userId);

    console.log(result);
    if (result.gameId) {
      dispatch({
        type: "GAME_ID",
        payload: {
          id: result.gameId,
        },
      });
      navigate(isConnected ? `/lobby/${result.gameId}` : "/login");
      console.log("ID DE LA GAME", result.gameId);
    }
  };

  return (
    <div className="home">
      <div className="page">
        {isDesktop && (
          <HomePageLinks
            handleLogout={() => {
              console.log("handleLogout");
              dispatch(actionLogout());
            }}
          />
        )}
        <Header />
        {isMobile && (
          <div className="buttons-mobile">
            <Button
              className="button-mobile"
              inverted
              onClick={() => navigate(isConnected ? "/lobby" : "/login")}
            >
              Cr??er une partie
            </Button>
            <Button
              className="button-mobile"
              inverted
              onClick={() => navigate("/archived")}
            >
              Parties archiv??es
            </Button>
            <Button
              className="button-mobile"
              inverted
              onClick={() => navigate("/login")}
            >
              Se connecter
            </Button>
            <Button
              className="button-mobile"
              inverted
              onClick={() => navigate("/signup")}
            >
              Inscription
            </Button>
            <img
              src={ScrollDown}
              className="scroll bounce"
              alt="scroll-down arrow"
            />
          </div>
        )}
        {isDesktop && (
          <div className="buttons-desktop">
            <Button
              className="menu-button"
              inverted
              onClick={handleCreatelobby}
            >
              Cr??er une partie
            </Button>
            <Button
              className="menu-button"
              inverted
              onClick={() => navigate("/archived")}
            >
              Parties archiv??es
            </Button>
            <img
              src={ScrollDown}
              className="scroll bounce"
              alt="scroll-down arrow"
            />
          </div>
        )}
        {/* <img className="homepage--moon" src={moon} /> */}
        {/* <img className="homepage--shadow" src={shadow} />
        <img className="homepage--bg" src={space} /> */}
      </div>

      <div className="rules">
        <h2 className="rules--main">R??gles du jeu</h2>
        <h3 className="rules--sub">
          Bienvenue sur l???application microscope web. Cette derni??re vise ??
          adapter Microscope, un jeu d?????criture collaboratif publi?? pour la
          premi??re fois en 2011 aux Etats-Unis.
        </h3>
        <p className="rules--text">
          Ce jeu a pour objectif, gr??ce ?? un syst??me de carte, de permettre
          l?????criture d???un r??cit de mani??re non-lin??aire.
          <br />
          <br /> Ainsi, le premier joueur pourrait s'int??resser ?? la conclusion
          de l???histoire et le suivant pourrait se concentrer sur une p??riode
          ant??rieure.
          <br />
          <br /> Le premier objectif d???une partie est d???incarner un simple
          spectateur lors du tour des autres joueurs, puis de devenir l???auteur
          d???une partie de l???histoire quand vient son tour, sans l???influence des
          autres participants.
          <br />
          <br /> Gr??ce ?? sa structure morcel??e, les parties sont capables de
          g??n??rer des coups de th????tres et autres rebonds transformant une
          simple anecdotes en instant narratif majeur.
          <br />
          <br />
        </p>
        <h3 className="rules--sub">Plus de d??tails :</h3>
        <ul className="rules--text">
          Une partie a besoin de quatre ??l??ment pour d??marrer:
          <br />
          <br />
          <li className="rules--text">
            Une <strong>Vue d???Ensemble</strong>
          </li>
          <p className="spacing">
            <i>
              - Exemple :<br /> Un Empire tyrannique chute gr??ce ?? la un
              mouvement rebelle
            </i>
          </p>
          <li className="rules--text">
            Le <strong>D??but</strong> et la <strong>Fin</strong> de l???histoire
            jou??e
          </li>
          <p className="spacing">
            <i>
              - Exemples :<br /> L???Empire met au point une station pouvant
              d??truire des plan??tes enti??res.
              <br />
              L???Empereur est vaincu et ses soldats fuient ?? travers la galaxie.
            </i>
          </p>
          <li className="rules--text">
            Une <strong>Palette</strong> r??unissant des th??matiques ?? faire
            figur??es ou ?? proscrire de la partie
          </li>
          <p className="spacing">
            <i>
              - Exemples :<br /> <strong>OUI :</strong> Ordre de chevalier,
              Magie
              <br />
              <strong>NON :</strong> Espace R??aliste
            </i>
          </p>
          <li className="rules--text">
            Une <strong>Premi??re Passe</strong> de cartes{" "}
            <strong>P??riodes</strong> et <strong>Ev??nements</strong>
          </li>
          <p className="spacing">
            <i>
              - Exemples :<br /> Carte P??riode, Le seigneur Vador tend un pi??ge
              ?? la R??sistance sur la plan??te Bespin
              <br />
              Carte P??riode, La R??sistance planifie et d??truit l'Etoile Noire
              <br />
              Carte ??v??nement, Le jeune fermier Luke trouve un contrebandier
              pour ??chapper au blocus de la plan??te Tatooine
              <br />
            </i>
          </p>
        </ul>
        <h3 className="rules--sub">
          Il existe trois ??chelles narratives dans le jeu :
        </h3>
        <p className="spacing">
          Des <strong>P??riodes</strong> d??finissant les grands arcs narratifs
          <br />
          <i>
            - Exemple : un jeune fermier rejoint la r??sistance et en devient le
            h??ros.
            <br />
          </i>
          <br />
          Des <strong>Ev??nements</strong> ponctuant les p??riodes en cours
          <br />
          <i>
            - Exemple : un vaisseau transportant des informations critiques ??
            l???existence de la r??sistance est poursuivi par l???empire.
            <br />
          </i>
          <br />
          Et enfin les <strong>Sc??nes</strong> (qui ne sont pas permises pour la{" "}
          <strong>Premi??re Passe</strong>) qui permettent de questionner et de
          r??soudre le d??roulement des ??v??nements
          <br />
          <i>
            - Exemple : la jeune diplomate, secr??tement membre de la r??sistance,
            arrivera-t-elle ?? fuir son vaisseau ?
            <br />
          </i>
          <br />
          Notre application permet ??galement de produire des cartes
          <strong> Focus</strong> !
          <br />
          <br />
          Elles permettent de d??finir une th??matique ou un point d???int??r??t pour
          le tour de table.
          <br />
          <i>
            - Exemples: le c??t?? obscur de la force, le personnage du jeune
            fermier, les voyages ?? travers les ??toiles, etc.???
            <br />
          </i>
          D???autres fonctionnalit??s seront ajout??es ?? notre application pour
          s???adapter ?? la vision de son auteur Ben Robbins. :)
          <br />
          <br />
          Nous avons pr??vu d???ajouter les cartes H??ritages, mais surtout la
          r??gulation des tours de jeu afin de permettre aux joueurs de se
          concentrer sur l???aspect cr??atif. Pour le moment, le livre Microscope
          est n??cessaire pour mener ?? bien une partie, mais l???objectif serait de
          faire ??voluer l???application vers un mod??le compl??tement ind??pendant.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
