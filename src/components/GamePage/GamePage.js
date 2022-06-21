import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Focus from "./Focus/Focus";
import FocusCreationModal from "./FocusCreationModal/FocusCreationsModal";
import "./GamePage.css";
import SettingsModal from "./SettingsModal/SettingsModal";
import StartEnd from "./StartEnd/StartEnd";

function GamePage() {
  // const dispatch = useDispatch();
  // const focus = useSelector((state) => state.game.focus);
  // console.log("state", focus);
  // const handleClick = (id) =>
  //   dispatch({
  //     type: "DELETE_FOCUS",
  //     payload: id,
  //   });

  useEffect(() => {
    console.log("verif focus", focus);
  }, [focus]);

  return (
    <div className="">
      <div className="players-usernames">
        <div className="player-username">Adlen</div>
        <div className="player-username">Jeremy</div>
        <div className="player-username">Victor</div>
        <div className="player-username">Pablo</div>
      </div>
      <div className="focus">
        <SettingsModal />
        <Focus />
        <FocusCreationModal />
      </div>
      <StartEnd />
      <div className="card-container">
        {/* <ul>
          {focus
            ? focus.map((f, i) => (
                <li key={i} onClick={() => handleClick(f)}>
                  {f.label}
                </li>
              ))
            : console.log("voici le focus", focus)}
        </ul> */}
      </div>
    </div>
  );
}

export default GamePage;