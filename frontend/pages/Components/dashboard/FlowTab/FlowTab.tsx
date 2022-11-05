import { Grid } from "@mantine/core";
import FlowCard from "./FlowCard";
import FlowCardAdd from "./FlowCardAdd";

const FlowTab = () => {
  return (
    <>
      <Grid>
        <FlowCard />
        <FlowCard />
        <FlowCardAdd />
      </Grid>
    </>
  );
};

export default FlowTab;
