import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import FlowCard, { FlowCardData } from "./FlowCard";
import FlowCardAdd from "./FlowCardAdd";

const FlowTab = () => {
  const [cards, setCards] = useState<FlowCardData[]>([]);

  useEffect(() => {
    fetch(`/api/flows`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setCards(
          json.map((el: any) => {
            return { id: el.id, name: el.name };
          })
        );
      });
  }, []);

  return (
    <>
      <Grid>
        {cards.map((card: FlowCardData) => {
          return <FlowCard data={card} key={card.id}></FlowCard>;
        })}
        <FlowCardAdd />
      </Grid>
    </>
  );
};

export default FlowTab;
