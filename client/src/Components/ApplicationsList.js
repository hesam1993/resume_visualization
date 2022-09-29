
import Table from "react-bootstrap/Table";
function ApplicationsList(props) {
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
              {props.applications.map((application)=>{
                return(
                  <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.positionTitle}</td>
                <td>{application.sumCandidates}</td>
              </tr>
                )
              })}
            </tbody>
          </Table>
        </>
     );
}

export default ApplicationsList;