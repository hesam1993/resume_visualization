
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
function ApplicationsList() {
    return ( 
        <>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Position Title</th>
                <th>Number of Applicants</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>5</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>5</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>5</td>
              </tr>
            </tbody>
          </Table>
        </>
     );
}

export default ApplicationsList;