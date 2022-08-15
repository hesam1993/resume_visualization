import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import ApplicationsList from "./ApplicationsList";

function Home() {
  return (
    <>
      <Container fluid>
        <Row>
          <ApplicationsList></ApplicationsList>
        </Row>
      </Container>
    </>
  );
}

export default Home;
