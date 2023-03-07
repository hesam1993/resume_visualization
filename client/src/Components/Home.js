import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import API from "../API/API";

import { useEffect, useState } from "react";
import PositionsList from "./PositionsList";

function Home() {
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    API.getPositions()
      .then((positionsInfo) => {
        setPositions(positionsInfo);
        console.log(positionsInfo);
      })
      .catch((err) => console.log(err));
    API.getFields()
      .then((fieldsInfo) => {
        setFields(fieldsInfo);
        console.log(fieldsInfo);
      })
      .catch((err) => console.log(err));
    API.getTeams()
      .then((teamsInfo) => {
        setTeams(teamsInfo);
        console.log(teamsInfo)
      })
      .catch((err) => console.log(err));
  }, []);

  const closingPosition = (positionId) => {
    console.log(positionId);
    API.closePosition(positionId)
      .then((result) => {
        if (result) {
          API.getPositions()
            .then((positionsInfo) => {
              setPositions(positionsInfo);
              console.log(positions);
            })
            .catch((err) => console.log(err));
        }
        // console.log(`it is candidates data : ${candidates}`);
      })
      .catch((err) => console.log(err));
  };
  // useEffect(() => {
  //   API.getApplications()
  //     .then((applicationsInfo) => {
  //       setApplications(applicationsInfo)
  //       console.log(applicationsInfo)

  //     })
  //     .catch((err) => console.log(err));
  // },[]);
  return (
    <>
      <Container fluid>
        <Row>
          {positions.length >0 && fields.length >0 && teams.length >0 && <PositionsList
            positions={positions}
            closingPosition={closingPosition}
            fields = {fields}
            teams={teams}
          ></PositionsList>}
        </Row>
      </Container>
    </>
  );
}

export default Home;
