import { useSelector } from "react-redux";
import { Card, Grid } from "semantic-ui-react";
import EventsCreationModal from "../EventsCreationModal/EventsCreationModal";
import "./Periods.css";

function Periods() {
  const periods = useSelector((state) => state.game.periods);
  console.log("state period", periods);
  const periode = [Grid.Column.length];
  const events = useSelector((state) => state.game.events);

  return (
    <Grid columns={periode.length} divided>
      <Grid.Row>
        {periods
          ? periods.map((p, i) => (
              <Grid.Column key={i} style={{ background: "black" }}>
                <Card style={{ background: "rgb(196, 207, 217)" }}>
                  <Card.Content>
                    <Card.Header>Période n°</Card.Header>
                    <Card.Description> {p.label} </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <EventsCreationModal />
                  </Card.Content>
                </Card>

                <Grid columns={2} divided>
                  {/* ROW EVENEMENT */}
                  <Grid.Row>
                    {/* COLONNE EVENEMENT */}
                    <Grid.Column verticalAlign="middle">
                      {/* CARTE EVENEMENT */}
                      {events
                        ? events.map((e, i) => (
                            <Card
                              key={i}
                              style={{ background: "rgb(45, 118, 103)" }}
                            >
                              <Card.Content>
                                <Card.Header>EVENEMENT 1</Card.Header>

                                <Card.Description>{e.label}</Card.Description>
                              </Card.Content>
                              <Card.Content extra></Card.Content>
                            </Card>
                          ))
                        : ""}

                      {/* FIN CARTE EVENEMENT */}
                    </Grid.Column>
                    {/* FIN COLONNE EVENEMENT */}

                    {/* COLONNE SCENE */}
                    <Grid.Column>
                      {/* CARTE SCENE */}
                      <Card style={{ background: "rgb(77, 92, 106)" }}>
                        <Card.Content>
                          <Card.Header>SCENE 1</Card.Header>
                          <Card.Meta>
                            <span className="date">Joined in 2015</span>
                          </Card.Meta>
                          <Card.Description>
                            Matthew is a musician living in Nashville.
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra></Card.Content>
                      </Card>
                      {/* FIN CARTE SCENE */}
                    </Grid.Column>
                    {/* FIN COLONNE SCENE */}
                  </Grid.Row>
                  {/* FIN ROW EVENEMENT */}
                </Grid>
              </Grid.Column>
            ))
          : ""}
      </Grid.Row>
    </Grid>
  );
}

export default Periods;

{
  /* <Grid divided>
 
  <Grid.Row></Grid.Row>
</Grid>; */
}
