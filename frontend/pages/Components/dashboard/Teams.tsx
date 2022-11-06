import { MainLink } from "../MainLink";

const fakeTeams = [
  {
    name: "Caziere",
  },
  {
    name: "Reclamații",
  },
];

const Teams = () => {
  return (
    <>
      {fakeTeams.map((object) => {
        return <MainLink label={object.name} key={object.name}></MainLink>;
      })}
    </>
  );
};
export default Teams;
