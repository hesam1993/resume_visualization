import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
function PositionsList() {
    return ( 
        <>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Field</th>
                <th>Status</th>
                <th>Required Skills</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>
                  <Badge className="mx-1" pill bg="primary">
                    React js
                  </Badge>
                  <Badge className="mx-1" pill bg="primary">
                    Bootstrap
                  </Badge>
                  <Badge className="mx-1" pill bg="primary">
                    Sass
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <Badge pill bg="primary">
                    Python
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Badge pill bg="primary">
                    C++
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
     );
}

export default PositionsList;