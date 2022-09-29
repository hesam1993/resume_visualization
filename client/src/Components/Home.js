import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import API from "../API/API"

import { useEffect,useState } from "react";
import PositionsList from "./PositionsList";

function Home() {
  const [applications, setApplications] = useState([]);
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    API.getPositions()
      .then((positionsInfo) => {
        setPositions(positionsInfo)
        console.log(positions)

      })
      .catch((err) => console.log(err));
  },[]);
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
          <PositionsList positions={positions}></PositionsList>
        </Row>
      </Container>
    </>
  );
}

export default Home;
