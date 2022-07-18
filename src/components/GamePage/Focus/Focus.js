import { Header, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";
import "./Focus.css";

function Focus() {
  const focus = useSelector((state) => state.game.focus);
  const players = useSelector((state) => state.game.players);
  console.log("state", focus);

  return (
    <div className="focus flex flex-col mb-8 max-w-5xl ">
      {focus
        ? focus.map((f, i) => {
            const author = players.find((player) => player.id === f.author_id);
            return (
              <Label
                style={{ background: "rgb(238, 237, 229)" }}
                key={i}
                className="w-2/3 !mx-auto !mb-2 overflow-y-auto"
              >
                <Header as="h5" className="focus--card-username  !text-xl">
                  {author?.username}
                </Header>
                {f.text}
              </Label>
            );
          })
        : console.log("voici le focus", focus)}
    </div>
  );
}

export default Focus;
