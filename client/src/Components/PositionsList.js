import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
function PositionsList(props) {
  return (
    <>
      <h3>List of all positions</h3>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default PositionsList;
