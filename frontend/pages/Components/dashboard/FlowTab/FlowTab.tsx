import { Grid } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import FlowCard, { FlowCardData } from "./FlowCard";
import FlowCardAdd from "./FlowCardAdd";

const FlowTab = () => {
  const [cards, setCards] = useState<FlowCardData[]>([]);

  const fetchData = useCallback(() => {
    fetch(`/api/flows`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCards(
          json.map((el: any) => {
            return { id: el.id, name: el.name };
          })
        );
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid>
        {cards.map((card: FlowCardData) => {
          return <FlowCard data={card} key={card.id}></FlowCard>;
        })}
        <FlowCardAdd onAdd={fetchData} />
      </Grid>
    </>
  );
};

export default FlowTab;
