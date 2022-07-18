/* eslint-disable react/prop-types */
import { Grid, Placeholder, Segment } from "semantic-ui-react";
import "./StartEnd.css";

function StartEnd({ start, startTone, end, endTone }) {
  return (
    <Grid columns={2} className="bookends !mb-8">
      <Grid.Column className="bookends--column">
        <Segment className="bookends--card ">
          <Placeholder.Header>
            <h2 className="text-black font-black text-xl">Début:</h2>
            <div className="text-black">
              {start} {startTone}
            </div>
          </Placeholder.Header>
        </Segment>
      </Grid.Column>

      <Grid.Column className="bookends--column">
        <Segment className="bookends--card">
          <Placeholder.Header>
            <h2 className="text-black font-black text-xl">Fin:</h2>
            <div className="text-black">
              {end} {endTone}
            </div>
          </Placeholder.Header>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default StartEnd;
