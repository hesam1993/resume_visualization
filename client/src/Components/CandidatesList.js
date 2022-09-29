import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import API from "../API/API";
import { Link,useNavigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
function CandidatesList() {
  let navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [position, setPosition] = useState([]);
  const [comparisonList, setComparisonList] = useState([])
  const [cmpBtn, setCmpBtn]=useState(true)
  const positionId = window.location.href.split("=")[1];
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        setCandidates(candidatesInfo);
        console.log(candidates);
      })
      .catch((err) => console.log(err));
    API.getPosition(positionId)
      .then((positionInfo) => {
        setPosition(positionInfo[0]);
        console.log(positionInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToComparison =(candidate)=>{
    if(comparisonList.length < 2){
      const newComparisonList = [...comparisonList]
      newComparisonList.push(candidate)
      setComparisonList(newComparisonList)
    }
  }
  const doComparison = ()=>{
    const firstCandidate = comparisonList[0].id
    const secondCandidate = comparisonList[1].id
    navigate(`/comparison?fid=${firstCandidate}&sid=${secondCandidate}&pid=${positionId}`);
  }
  return (
    <>
      <Stack direction="horizontal" className="p-3" gap={3}>
        <h3>
          Candidates For "{position.title}" Position, ID: {position.id}
        </h3>
        <Button variant="primary" style={{ position: "fixed", right: "30px" }} onClick={doComparison} disabled={comparisonList.length === 2 ? false : true}>
          Compare Candidates
        </Button>{" "}
      </Stack>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Field</th>
            <th>Skills</th>
            <th>HR Score</th>
            <th>Candidate Score</th>
            <th>Details</th>
            <th>Comparison</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => {
            let refLink = `/profile?cId=${candidate.id}`;
            return (
              <tr key={index}>
                <td>{candidate.id}</td>
                <td>{candidate.candidateName}</td>
                <td>{candidate.age}</td>
                <td>{candidate.sex}</td>
                <td>{candidate.field}</td>
                <td>
                  {candidate.skills.map((s, index) => {
                    return (
                      <Badge key={index} className="mx-1" pill bg="primary">
                        {s}
                      </Badge>
                    );
                  })}
                </td>
                <td>{candidate.hrScore}</td>
                <td>{candidate.candidateScore}</td>
                <td>
                  <Link to={refLink}>
                    <Button variant="primary">Details</Button>{" "}
                  </Link>
                </td>
                <td>
                  <Button variant="success" onClick={()=>{addToComparison(candidate)}}>Add to comparison</Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default CandidatesList;
