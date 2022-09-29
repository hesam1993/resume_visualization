import { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import API from "../API/API";
import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
function Comparison() {
  let [searchParams, setSearchParams] = useSearchParams();
  const positionId = searchParams.get("pid");
  const firstId = searchParams.get("fid");
  const secondId = searchParams.get("sid");
  const [newCandidates, setNewCandidates] = useState([
    { info: {}, education: {}, works: {} },
    { info: {}, education: {}, works: {} },
  ]);
  console.log(positionId);
  useEffect(() => {
    API.getApplication(positionId)
      .then((candidatesInfo) => {
        const cmpCandidates = [...newCandidates]
        candidatesInfo.map((candidate) => {
          if (candidate.id == firstId) {
            cmpCandidates[0].info = candidate;
          } else if (candidate.id == secondId) {
            cmpCandidates[1].info = candidate;
          }
        });
        setNewCandidates(cmpCandidates);
      })
      .catch((err) => console.log(err));

    API.getEducations()
      .then((educationInfo) => {
        const cmpCandidates = [...newCandidates]
        educationInfo.map((education) => {
          if (education.id == firstId) {
            cmpCandidates[0].education = education;
          } else if (education.id == secondId) {
            cmpCandidates[1].education = education;
          }
        });
        console.log(cmpCandidates)
        setNewCandidates(cmpCandidates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Comparing Candidates</h1>
      {Object.keys(newCandidates[0].info).length !== 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={1}>Info</th>
              <th colSpan={1}>First Candidate</th>
              <th colSpan={1}>Second Candidate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{newCandidates[0].info.candidateName}</td>

              <td>{newCandidates[1].info.candidateName}</td>
            </tr>{" "}
            <tr>
              <td>age</td>
              <td>{newCandidates[0].info.age}</td>

              <td>{newCandidates[1].info.age}</td>
            </tr>{" "}
            <tr>
              <td>sex</td>
              <td>{newCandidates[0].info.sex}</td>

              <td>{newCandidates[1].info.sex}</td>
            </tr>{" "}
            <tr>
              <td>Candidate Score</td>
              <td>{newCandidates[0].info.candidateScore}</td>

              <td>{newCandidates[1].info.candidateScore}</td>
            </tr>{" "}
            <tr>
              <td>HR Score</td>
              <td>{newCandidates[0].info.hrScore}</td>

              <td>{newCandidates[1].info.hrScore}</td>
            </tr>{" "}
            <tr>
              <td>Field</td>
              <td>{newCandidates[0].info.field}</td>

              <td>{newCandidates[1].info.field}</td>
            </tr>{" "}
            <tr>
              <td>Skills</td>
              <td>
                {newCandidates[0].info.skills.map((skill, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {skill}
                    </Badge>
                  );
                })}
              </td>
              <td>
                {newCandidates[1].info.skills.map((skill, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {skill}
                    </Badge>
                  );
                })}
              </td>
            </tr>{" "}
            <tr>
              <td>Experience</td>
              <td>{newCandidates[0].info.experienceYears}</td>

              <td>{newCandidates[1].info.experienceYears}</td>
            </tr>
            <tr>
              <td>Education</td>
              <td>{newCandidates[0].education.location}</td>

              <td>{newCandidates[1].education.location}</td>
            </tr>
            <tr>
              <td>Work Experience</td>
              <td>{newCandidates[0].info.work}</td>

              <td>{newCandidates[1].info.work}</td>
            </tr>
            <tr>
              <td>Languages</td>
              <td>
                {newCandidates[0].info.languages.map((language, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {language}
                    </Badge>
                  );
                })}
              </td>

              <td>
                {newCandidates[1].info.languages.map((language, index) => {
                  return (
                    <Badge key={index} className="mx-1" pill bg="primary">
                      {language}
                    </Badge>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{newCandidates[0].info.location}</td>

              <td>{newCandidates[1].info.location}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{newCandidates[0].info.positionTitle}</td>

              <td>{newCandidates[1].info.positionTitle}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Comparison;
