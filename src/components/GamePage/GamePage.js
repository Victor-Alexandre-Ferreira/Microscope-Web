import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance } from "requests";
import { updateGameInfo } from "../../actions/gameActions";
// import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Focus from "./Focus/Focus";
import FocusCreationModal from "./FocusCreationModal/FocusCreationModal";
import "./GamePage.css";
import Periods from "./Periods/Periods";
import PeriodsCreationModal from "./Periods/PeriodsCreationModal";

import SettingsModal from "./SettingsModal/SettingsModal";
import StartEnd from "./StartEnd/StartEnd";
import HomeNav from "./HomeNav/HomeNav";

function GamePage() {
  // const focus = useSelector((state) => state.game.focus);
  const gameId = useSelector((state) => state.game.gameId);
  const bigPicture = useSelector((state) => state.game.bigPicture);
  const start = useSelector((state) => state.game.start);
  const startTone = useSelector((state) => state.game.startTone);
  const end = useSelector((state) => state.game.end);
  const endTone = useSelector((state) => state.game.endTone);
  const isConnected = useSelector((state) => state.user.isConnected);
  const palettes = useSelector((state) => state.game.palettes);
  const players = useSelector((state) => state.game.players);
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log("state", focus);
  // const handleClick = (id) =>
  //   dispatch({
  //     type: "DELETE_FOCUS",
  //     payload: id,
  //   });

  // TODO:
  // useEffect(() => {
  //   getGameinfos(gameId);
  // }, [])

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    async function fetchGameInfo() {
      const response = await axiosInstance.get(`/game/${gameId || id}/ongoing`);
      dispatch(updateGameInfo(response.data));

      console.log(
        "response >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        response.data
      );
    }

    if (isConnected) fetchGameInfo();
  }, [isConnected]);

  // useEffect(() => {
  //   console.log("verif focus", focus);
  // }, [focus]);

  return (
    <div className="gamepage">
      <HomeNav />
      <ul className="flex">
        {players &&
          players.map(
            (player) =>
              player?.id && (
                <li key={player.id} className="mx-auto mt-8 mb-8">
                  {player.username}
                </li>
              )
          )}
      </ul>
      <div className="settings-section flex justify-between mb-8">
        <SettingsModal palettes={palettes} bigPicture={bigPicture} />
        <Focus />
        <FocusCreationModal />
      </div>
      <StartEnd
        start={start}
        startTone={startTone}
        end={end}
        endTone={endTone}
      />
      <PeriodsCreationModal />
      <Periods />
    </div>
  );
}

export default GamePage;
