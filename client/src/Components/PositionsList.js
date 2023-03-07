import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import API from "../API/API";
import { Stack, Form, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function PositionsList(props) {
  let posTitle, posDesc, posExp, posField, posLanguages, posTeam, posSkills;
  const [posModalShow, setPosModalShow] = useState(false);
  const [fields, setFields] = useState(props.fields);
  const [teams, setTeams] = useState(props.teams);
  const [positionForm, setPositionForm] = useState([]);

  const showNewPositionModal = () => {
    setPosModalShow(true);
  };
  const submitPosition = () => {
    let tempPositions = [
      {
        title: posTitle,
        desc: posDesc,
        fieldId: posField,
        teamId: posTeam,
        skills: posSkills,
        languages: posLanguages,
        minExp: posExp,
      },
    ];
    console.log(tempPositions[0])
    API.addPosition(tempPositions[0])
      .then((results) => {
        console.log(results);
      })
      .catch((err) => console.log(err));
    setPositionForm([tempPositions]);
  };
  const changePosForm = (event) => {
    let fieldName = event.target.id;
    let fieldValue = event.target.value;

    switch (fieldName) {
      case "posTitle":
        posTitle = fieldValue;
        break;
      case "posDesc":
        posDesc = fieldValue;
        break;
      case "posSkills":
        posSkills = fieldValue;
        break;
      case "posLanguages":
        posLanguages = fieldValue;
        break;
      case "posExp":
        posExp = fieldValue;
        break;
      case "posField":
        posField = fieldValue;
        console.log(fieldValue)
        break;
      case "posTeam":
        posTeam = fieldValue;
        console.log(fieldValue)
        break;
      default:
        console.log("HELLO");
    }
  };

  const NewPositionModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new position
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Position Title</Form.Label>
                <Form.Control
                  id="posTitle"
                  onChange={changePosForm}
                  type="text"
                  placeholder="position's title"
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="posDesc"
                onChange={changePosForm}
                placeholder="enter some description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                id="posSkills"
                onChange={changePosForm}
                placeholder="separate skills with ',' "
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Languages</Form.Label>
              <Form.Control
                id="posLanguages"
                onChange={changePosForm}
                placeholder="separate languages with ',' "
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Minimum Experience</Form.Label>
                <Form.Control
                  id="posExp"
                  onChange={changePosForm}
                  type="number"
                  placeholder="minimum years of experience"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Field</Form.Label>
                <Form.Select
                  id="posField"
                  onChange={changePosForm}
                  defaultValue="0"
                >
                <option value={0} >Select an Item</option>
                  {fields.map((field,index) => {

                    return <option key={index} value={field.id}>{field.field}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Related team</Form.Label>
                <Form.Select
                  id="posTeam"
                  onChange={changePosForm}
                  defaultValue="0"
                >
                  <option value={0} >Select an Item</option>
                  {teams.map((team,index) => {
                    return <option key={index} value={team.id}>{team.name}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group> */}
            </Row>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

            <Button variant="primary" onClick={() => submitPosition()}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      <Stack>
        <h3>List of all positions</h3>
        <Button
          variant="success"
          style={{ position: "absolute", right: "200px" }}
          onClick={() => {
            showNewPositionModal();
          }}
        >
          Add a new position
        </Button>
        <Button
          variant="success"
          style={{ position: "absolute", right: "30px" }}
        >
          Add a new team
        </Button>
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Field</th>
            <th>Exp</th>
            <th>Required Skills</th>
            <th>Number of Applicants</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {props.positions.map((p) => {
            let refLink = `/candidates?posId=${p.id}`;
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.field}</td>
                <td>{p.minExp}</td>
                <td>
                  {p.skills.map((s, index) => {
                    return (
                      <Badge key={index} className="mx-1" pill bg="primary">
                        {s}
                      </Badge>
                    );
                  })}
                </td>
                <td>{p.sumCandidates}</td>

                <td>{p.status === 1 ? "Active" : "Not Active"}</td>
                <td>
                  <Link to={refLink}>
                    <Button variant="primary">Details</Button>{" "}
                  </Link>
                </td>
                {/* <td>
                    <Button variant="danger" onClick={()=>props.closingPosition(p.id)}>Close this position</Button>{" "}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <NewPositionModal
        show={posModalShow}
        onHide={() => setPosModalShow(false)}
      />
    </>
  );
}

export default PositionsList;
